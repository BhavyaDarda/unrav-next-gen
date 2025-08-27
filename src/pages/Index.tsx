import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { LegalDocument } from "@/components/LegalDocument";
import { Demo } from "@/components/Demo";
import { Bookmarklet } from "@/components/Bookmarklet";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <LegalDocument />
        <Demo />
        <Bookmarklet />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
