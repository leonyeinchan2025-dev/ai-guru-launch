import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import logo from "@/assets/aiguru-logo.jpg";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/");
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("အောင်မြင်စွာ ဝင်ရောက်ပြီးပါပြီ!");
        navigate("/");
      } else {
        if (!username.trim()) {
          toast.error("Username ထည့်ပေးပါ");
          setLoading(false);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success("အကောင့်ဖန်တီးပြီးပါပြီ! Email ကို စစ်ဆေးပါ။");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl border border-neon bg-card p-8 glow-neon"
      >
        <div className="mb-6 flex flex-col items-center gap-3">
          <img src={logo} alt="AI GURU" className="h-14 w-14 rounded-full" />
          <h1 className="font-heading text-2xl font-bold text-foreground">
            AI <span className="text-gradient-neon">GURU</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            {isLogin ? "အကောင့်ဖြင့် ဝင်ရောက်ပါ" : "အကောင့်အသစ် ဖန်တီးပါ"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="သင့်နာမည်ထည့်ပါ"
                className="border-border bg-muted text-foreground placeholder:text-muted-foreground focus:border-accent"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
              className="border-border bg-muted text-foreground placeholder:text-muted-foreground focus:border-accent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="border-border bg-muted text-foreground placeholder:text-muted-foreground focus:border-accent"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full border border-neon bg-accent/20 text-accent hover:bg-accent/30 glow-neon"
          >
            {loading ? "ခဏစောင့်ပါ..." : isLogin ? "ဝင်ရောက်မည်" : "အကောင့်ဖန်တီးမည်"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isLogin ? "အကောင့်မရှိသေးဘူးလား?" : "အကောင့်ရှိပြီးသားလား?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-accent underline-offset-4 hover:underline"
          >
            {isLogin ? "အကောင့်ဖန်တီးမည်" : "ဝင်ရောက်မည်"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
