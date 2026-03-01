import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/aiguru-logo.jpg";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

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
          {user && (
            <a href="/lessons" className="text-sm text-muted-foreground transition-colors hover:text-accent">သင်ခန်းစာ</a>
          )}
        </nav>

        {loading ? (
          <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
        ) : user && profile ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border border-neon bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-all hover:bg-accent/20">
              <User className="h-4 w-4" />
              {profile.username}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-neon bg-card">
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                ထွက်မည်
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <a
            href="/auth"
            className="rounded-lg border border-neon bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-all hover:bg-accent/20"
          >
            ဝင်ရောက်မည်
          </a>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
