import { motion } from "framer-motion";
import logo from "@/assets/aiguru-logo.jpg";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-neon bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="AI GURU Logo" className="h-10 w-10 rounded-full" />
          <span className="font-heading text-lg font-bold tracking-wider text-foreground">
            AI <span className="text-gradient-neon">GURU</span>
          </span>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#about" className="text-sm text-muted-foreground transition-colors hover:text-accent">About</a>
          <a href="#fields" className="text-sm text-muted-foreground transition-colors hover:text-accent">AI Fields</a>
          <a href="#roadmap" className="text-sm text-muted-foreground transition-colors hover:text-accent">Roadmap</a>
          <a href="/lessons" className="text-sm text-muted-foreground transition-colors hover:text-accent">သင်ခန်းစာ</a>
        </nav>
        <a
          href="/auth"
          className="rounded-lg border border-neon bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-all hover:bg-accent/20 hover:glow-neon"
        >
          ဝင်ရောက်မည်
        </a>
      </div>
    </motion.header>
  );
};

export default Header;
