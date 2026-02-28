import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AIFields from "@/components/AIFields";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <AIFields />
      <Roadmap />
      <Footer />
    </div>
  );
};

export default Index;
