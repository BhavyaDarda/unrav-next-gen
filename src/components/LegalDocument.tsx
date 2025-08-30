import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, 
  Upload, 
  AlertTriangle, 
  CheckCircle, 
  MessageSquare,
  Scale,
  Shield,
  Eye,
  Download,
  Sparkles,
  Brain,
  Search,
  Users,
  Clock
} from "lucide-react";

export function LegalDocument() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [userQuestion, setUserQuestion] = useState("");

  const documentTypes = [
    {
      type: "rental",
      label: "Rental Agreement",
      icon: Shield,
      examples: ["Lease agreements", "Rental contracts", "Tenant agreements"],
      color: "text-primary"
    },
    {
      type: "loan",
      label: "Loan Contract",
      icon: Scale,
      examples: ["Mortgage agreements", "Personal loans", "Credit agreements"],
      color: "text-secondary"
    },
    {
      type: "employment",
      label: "Employment Contract",
      icon: Users,
      examples: ["Job contracts", "NDA agreements", "Non-compete clauses"],
      color: "text-accent"
    },
    {
      type: "terms",
      label: "Terms of Service",
      icon: FileText,
      examples: ["Privacy policies", "User agreements", "Service terms"],
      color: "text-foreground"
    }
  ];

  const analysisFeatures = [
    {
      title: "Plain English Summary",
      description: "Complex legal jargon translated into clear, understandable language",
      icon: FileText,
      color: "text-primary"
    },
    {
      title: "Risk Assessment",
      description: "Identify potential red flags and unfavorable terms",
      icon: AlertTriangle,
      color: "text-destructive"
    },
    {
      title: "Key Clauses Explained",
      description: "Detailed breakdown of important contract sections",
      icon: Eye,
      color: "text-secondary"
    },
    {
      title: "Interactive Q&A",
      description: "Ask specific questions about your document",
      icon: MessageSquare,
      color: "text-accent"
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setAnalysis(null);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    try {
      // Start progress animation
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + Math.random() * 10;
        });
      }, 800);

      // Read file content
      const fileContent = await uploadedFile.text();
      
      // Call our Supabase edge function
      const { supabase } = await import("@/integrations/supabase/client");
      
      const { data, error } = await supabase.functions.invoke('analyze-legal-document', {
        body: {
          documentText: fileContent,
          fileName: uploadedFile.name
        }
      });

      clearInterval(progressInterval);
      setAnalysisProgress(100);

      if (error) {
        console.error('Analysis error:', error);
        throw new Error(error.message || 'Analysis failed');
      }

      if (!data?.analysis) {
        throw new Error('No analysis data received');
      }

      setAnalysis(data.analysis);
      setIsAnalyzing(false);
      
    } catch (error) {
      console.error('Error analyzing document:', error);
      setIsAnalyzing(false);
      setAnalysisProgress(0);
      
      // Show error state
      setAnalysis({
        summary: "Sorry, we encountered an error analyzing your document. Please try again or contact support.",
        riskLevel: "unknown",
        risks: [
          {
            severity: "high",
            clause: "Analysis Error",
            issue: error instanceof Error ? error.message : "Unknown error occurred",
            impact: "Document could not be analyzed"
          }
        ],
        keyTerms: []
      });
    }
  };

  const askQuestion = async () => {
    if (!userQuestion.trim() || !analysis) return;
    
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          question: userQuestion,
          context: `Legal Document Analysis: ${analysis.summary}`,
          chatHistory: []
        }
      });

      if (error) {
        console.error('Q&A error:', error);
        return;
      }

      if (data?.success) {
        console.log("AI Response:", data.answer);
        // Here you could add the response to a chat history state
      }
      
      setUserQuestion("");
    } catch (error) {
      console.error('Error asking question:', error);
    }
  };

  return (
    <section id="legal-analysis" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-8">
          <div className="bg-primary text-primary-foreground brutal-border brutal-shadow px-8 py-4 inline-block transform -rotate-2">
            <div className="flex items-center gap-3 text-lg font-black uppercase">
              <Scale className="w-6 h-6" />
              LEGAL DOCUMENT AI ANALYZER
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black leading-none">
            <div className="bg-foreground text-background brutal-border brutal-shadow-lg px-4 sm:px-8 py-2 sm:py-4 mb-2 sm:mb-4 transform rotate-1">
              DEMYSTIFY
            </div>
            <div className="bg-secondary text-secondary-foreground brutal-border brutal-shadow-lg px-4 sm:px-8 py-2 sm:py-4 mb-2 sm:mb-4 transform -rotate-1">
              LEGAL
            </div>
            <div className="bg-accent text-accent-foreground brutal-border brutal-shadow-lg px-4 sm:px-8 py-2 sm:py-4 transform rotate-2">
              DOCUMENTS
            </div>
          </h2>

          <div className="bg-muted brutal-border brutal-shadow px-4 sm:px-8 py-4 sm:py-6 max-w-4xl mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl font-bold uppercase leading-tight">
              UPLOAD YOUR LEGAL DOCUMENTS AND GET INSTANT AI-POWERED ANALYSIS, 
              PLAIN ENGLISH SUMMARIES, AND RISK ASSESSMENTS TO PROTECT YOURSELF.
            </p>
          </div>
        </div>

        {/* Document Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {documentTypes.map((type) => (
            <Card key={type.type} className="bg-background brutal-border brutal-shadow hover:brutal-shadow-lg transition-all duration-100 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="bg-muted brutal-border p-4 mx-auto w-fit mb-4">
                  <type.icon className={`w-8 h-8 ${type.color}`} />
                </div>
                <CardTitle className="font-black uppercase text-sm">{type.label}</CardTitle>
                <CardDescription className="text-xs font-bold uppercase">
                  {type.examples.join(" • ")}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Upload Interface */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-background brutal-border-thick brutal-shadow-lg">
            <CardHeader className="bg-foreground text-background">
              <CardTitle className="text-2xl font-black uppercase tracking-wider flex items-center gap-3">
                <Upload className="w-6 h-6" />
                DOCUMENT UPLOAD & ANALYSIS
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-8 space-y-8">
              {/* File Upload */}
              <div className="space-y-6">
                <div className="bg-secondary text-secondary-foreground brutal-border p-4 transform -rotate-1">
                  <h3 className="text-xl font-black uppercase">UPLOAD YOUR LEGAL DOCUMENT</h3>
                </div>
                
                <div className="brutal-border bg-muted/50 p-8 text-center">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="legal-doc-upload"
                  />
                  <label htmlFor="legal-doc-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-foreground" />
                    <p className="text-foreground mb-4 font-bold uppercase">
                      {uploadedFile ? uploadedFile.name : "DROP LEGAL DOCUMENTS HERE OR CLICK TO BROWSE"}
                    </p>
                    <p className="text-muted-foreground text-xs font-bold uppercase">
                      SUPPORTS PDF, DOC, DOCX, TXT FILES
                    </p>
                  </label>
                </div>

                {uploadedFile && (
                  <Button 
                    variant="brutal" 
                    size="lg" 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full text-xl py-6"
                  >
                    {isAnalyzing ? (
                      <>
                        <Brain className="w-6 h-6 mr-2 animate-brutal-shake" />
                        ANALYZING DOCUMENT...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6 mr-2" />
                        ANALYZE DOCUMENT
                      </>
                    )}
                  </Button>
                )}

                {isAnalyzing && (
                  <div className="space-y-4">
                    <Progress value={analysisProgress} className="h-4" />
                    <p className="text-center text-sm font-bold uppercase text-muted-foreground">
                      Processing legal document with AI... {Math.round(analysisProgress)}%
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="bg-primary text-primary-foreground brutal-border brutal-shadow px-8 py-4 inline-block transform rotate-1">
              <h3 className="text-2xl font-black uppercase">ANALYSIS COMPLETE</h3>
            </div>

            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="bg-muted brutal-border w-full h-auto p-2 grid grid-cols-2 sm:grid-cols-4 gap-1">
                <TabsTrigger value="summary" className="brutal-border bg-primary text-primary-foreground font-black uppercase text-xs sm:text-sm data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground p-2">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">SUMMARY</span>
                </TabsTrigger>
                <TabsTrigger value="risks" className="brutal-border bg-primary text-primary-foreground font-black uppercase text-xs sm:text-sm data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground p-2">
                  <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">RISKS</span>
                </TabsTrigger>
                <TabsTrigger value="terms" className="brutal-border bg-primary text-primary-foreground font-black uppercase text-xs sm:text-sm data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground p-2 hidden sm:flex">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">KEY TERMS</span>
                </TabsTrigger>
                <TabsTrigger value="chat" className="brutal-border bg-primary text-primary-foreground font-black uppercase text-xs sm:text-sm data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground p-2 hidden sm:flex">
                  <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden xs:inline">ASK AI</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-6 mt-8">
                <Card className="bg-background brutal-border brutal-shadow">
                  <CardHeader>
                    <CardTitle className="font-black uppercase flex items-center gap-3">
                      <FileText className="w-6 h-6" />
                      PLAIN ENGLISH SUMMARY
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-medium leading-relaxed">{analysis.summary}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="risks" className="space-y-6 mt-8">
                <div className="space-y-4">
                  {analysis.risks.map((risk: any, index: number) => (
                    <Alert key={index} className={`brutal-border ${
                      risk.severity === 'high' ? 'border-destructive bg-destructive/10' :
                      risk.severity === 'medium' ? 'border-yellow-500 bg-yellow-500/10' :
                      'border-blue-500 bg-blue-500/10'
                    }`}>
                      <AlertTriangle className={`h-4 w-4 ${
                        risk.severity === 'high' ? 'text-destructive' :
                        risk.severity === 'medium' ? 'text-yellow-500' :
                        'text-blue-500'
                      }`} />
                      <AlertDescription className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={risk.severity === 'high' ? 'destructive' : 'secondary'} className="font-black uppercase">
                            {risk.severity} RISK
                          </Badge>
                          <span className="font-bold">{risk.clause}</span>
                        </div>
                        <p className="font-medium">{risk.issue}</p>
                        <p className="text-sm font-bold text-muted-foreground uppercase">
                          IMPACT: {risk.impact}
                        </p>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="terms" className="space-y-6 mt-8">
                <div className="grid gap-6">
                  {analysis.keyTerms.map((term: any, index: number) => (
                    <Card key={index} className="bg-background brutal-border brutal-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-black uppercase">{term.term}</h4>
                            <Badge variant="outline" className="font-black uppercase">
                              {term.section}
                            </Badge>
                          </div>
                          <p className="text-base font-medium leading-relaxed">
                            {term.explanation}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="chat" className="space-y-6 mt-8">
                <Card className="bg-background brutal-border brutal-shadow">
                  <CardHeader>
                    <CardTitle className="font-black uppercase flex items-center gap-3">
                      <MessageSquare className="w-6 h-6" />
                      ASK QUESTIONS ABOUT YOUR DOCUMENT
                    </CardTitle>
                    <CardDescription className="font-bold uppercase">
                      Get instant answers about specific clauses, terms, or concerns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      <Input
                        type="text"
                        placeholder="Ask about specific clauses, obligations, or terms..."
                        value={userQuestion}
                        onChange={(e) => setUserQuestion(e.target.value)}
                        className="h-12 text-base bg-background brutal-border font-medium"
                        onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
                      />
                      <Button 
                        variant="brutal" 
                        onClick={askQuestion}
                        disabled={!userQuestion.trim()}
                        className="h-12 px-8"
                      >
                        <Search className="w-5 h-5 mr-2" />
                        ASK
                      </Button>
                    </div>
                    
                    <div className="bg-muted brutal-border p-4">
                      <h5 className="font-black uppercase text-sm mb-2">EXAMPLE QUESTIONS:</h5>
                      <div className="text-xs font-bold uppercase text-muted-foreground space-y-1">
                        <p>• "What happens if I break the lease early?"</p>
                        <p>• "Am I responsible for property damage?"</p>
                        <p>• "Can the landlord enter without notice?"</p>
                        <p>• "What are my rights regarding security deposits?"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Analysis Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analysisFeatures.map((feature, index) => (
            <Card key={index} className="bg-background brutal-border brutal-shadow hover:brutal-shadow-lg transition-all duration-100 hover:-translate-y-2 text-center">
              <CardContent className="p-8">
                <div className="bg-muted brutal-border p-4 mb-4 mx-auto w-fit">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h4 className="font-black uppercase mb-2 text-sm">{feature.title}</h4>
                <p className="text-xs font-bold uppercase text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-8">
          <div className="bg-accent text-accent-foreground brutal-border brutal-shadow px-8 py-4 inline-block transform -rotate-1">
            <h3 className="text-2xl font-black uppercase">PROTECT YOURSELF TODAY</h3>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="brutal" size="lg" className="text-xl px-12 py-6 h-auto">
              <Shield className="w-6 h-6 mr-3" />
              ANALYZE MY DOCUMENTS
            </Button>
            <Button variant="warning" size="lg" className="text-xl px-12 py-6 h-auto">
              <Download className="w-6 h-6 mr-3" />
              DOWNLOAD REPORT
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}