import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface FileUploadOptions {
  maxSize?: number; // in MB
  allowedTypes?: string[];
}

interface UploadedFile {
  id: string;
  file: File;
  content: string;
  type: string;
  storagePath?: string;
  dbId?: string;
}

export function useEnhancedFileUpload(options: FileUploadOptions = {}) {
  const { 
    maxSize = 50, 
    allowedTypes = [
      'text/plain',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/json',
      'audio/mpeg',
      'audio/wav',
      'video/mp4',
      'video/webm',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ] 
  } = options;
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  const validateFile = useCallback((file: File): string | null => {
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }
    
    if (!allowedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported`;
    }
    
    return null;
  }, [maxSize, allowedTypes]);

  const extractFileContent = useCallback(async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target?.result as string;
        
        // For text files, return content directly
        if (file.type === 'text/plain' || file.type === 'application/json') {
          resolve(content);
          return;
        }
        
        // For other files, we'll extract metadata or return a preview
        if (file.type.startsWith('image/')) {
          resolve(`[Image file: ${file.name}, Size: ${(file.size / 1024).toFixed(2)}KB]`);
        } else if (file.type.startsWith('audio/')) {
          resolve(`[Audio file: ${file.name}, Size: ${(file.size / 1024 / 1024).toFixed(2)}MB]`);
        } else if (file.type.startsWith('video/')) {
          resolve(`[Video file: ${file.name}, Size: ${(file.size / 1024 / 1024).toFixed(2)}MB]`);
        } else if (file.type.includes('pdf')) {
          resolve(`[PDF file: ${file.name}, Size: ${(file.size / 1024).toFixed(2)}KB]`);
        } else if (file.type.includes('word')) {
          resolve(`[Document file: ${file.name}, Size: ${(file.size / 1024).toFixed(2)}KB]`);
        } else {
          resolve(`[File: ${file.name}, Type: ${file.type}, Size: ${(file.size / 1024).toFixed(2)}KB]`);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      if (file.type === 'text/plain' || file.type === 'application/json') {
        reader.readAsText(file);
      } else {
        // For binary files, we just extract metadata
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const uploadToStorage = useCallback(async (file: File): Promise<string | null> => {
    if (!user) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from('uploads')
      .upload(fileName, file);

    if (error) {
      console.error('Storage upload error:', error);
      return null;
    }

    return fileName;
  }, [user]);

  const saveToDatabase = useCallback(async (
    file: File, 
    storagePath: string | null, 
    content: string
  ): Promise<string | null> => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('file_uploads')
      .insert({
        user_id: user.id,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        storage_path: storagePath || '',
        content_preview: content.substring(0, 1000), // Store first 1000 chars as preview
      })
      .select()
      .single();

    if (error) {
      console.error('Database insert error:', error);
      return null;
    }

    return data.id;
  }, [user]);

  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    setIsUploading(true);
    
    try {
      const processedFiles: UploadedFile[] = [];
      
      for (const file of fileArray) {
        const validationError = validateFile(file);
        if (validationError) {
          toast({
            title: "Invalid File",
            description: validationError,
            variant: "destructive",
          });
          continue;
        }
        
        try {
          // Extract content
          const content = await extractFileContent(file);
          
          // Upload to storage if user is authenticated
          let storagePath: string | null = null;
          let dbId: string | null = null;
          
          if (user) {
            storagePath = await uploadToStorage(file);
            dbId = await saveToDatabase(file, storagePath, content);
          }
          
          processedFiles.push({
            id: dbId || Date.now().toString(),
            file,
            content,
            type: file.type,
            storagePath,
            dbId,
          });
        } catch (error) {
          toast({
            title: "File Processing Error",
            description: `Failed to process ${file.name}`,
            variant: "destructive",
          });
        }
      }
      
      setUploadedFiles(prev => [...prev, ...processedFiles]);
      
      if (processedFiles.length > 0) {
        toast({
          title: "Files Processed",
          description: `Successfully processed ${processedFiles.length} file(s)`,
        });
      }
      
    } finally {
      setIsUploading(false);
    }
  }, [validateFile, extractFileContent, uploadToStorage, saveToDatabase, toast, user]);

  const removeFile = useCallback(async (index: number) => {
    const file = uploadedFiles[index];
    
    // Remove from storage and database if exists
    if (file.dbId && user) {
      await supabase.from('file_uploads').delete().eq('id', file.dbId);
    }
    
    if (file.storagePath && user) {
      await supabase.storage.from('uploads').remove([file.storagePath]);
    }
    
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  }, [uploadedFiles, user]);

  const clearFiles = useCallback(async () => {
    // Clean up storage and database
    if (user) {
      const fileIds = uploadedFiles.filter(f => f.dbId).map(f => f.dbId);
      const storagePaths = uploadedFiles.filter(f => f.storagePath).map(f => f.storagePath);
      
      if (fileIds.length > 0) {
        await supabase.from('file_uploads').delete().in('id', fileIds);
      }
      
      if (storagePaths.length > 0) {
        await supabase.storage.from('uploads').remove(storagePaths);
      }
    }
    
    setUploadedFiles([]);
  }, [uploadedFiles, user]);

  return {
    uploadFiles,
    removeFile,
    clearFiles,
    uploadedFiles,
    isUploading,
    validateFile,
  };
}