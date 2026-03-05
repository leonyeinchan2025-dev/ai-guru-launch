import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, Clock } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  category: string;
  content: string | null;
  thumbnail_url: string | null;
}

const Lessons = () => {
  const { user, profile, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const canAccessLessons = !!user && (isAdmin || (profile?.is_approved ?? false));

  useEffect(() => {
    if (!user) return;
    const fetchLessons = async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("is_published", true)
        .order("order_index");

      if (!error && data) setLessons(data);
      setLoading(false);
    };
    fetchLessons();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pb-20 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            သင်ခန်းစာ<span className="text-gradient-neon">များ</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            AI နည်းပညာကို မြန်မာဘာသာဖြင့် အဆင့်ဆင့် လေ့လာပါ
          </p>
        </motion.div>

        {authLoading || !user ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : !canAccessLessons ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-md rounded-2xl border border-neon bg-card p-12 text-center glow-neon"
          >
            <Clock className="mx-auto mb-4 h-12 w-12 text-accent" />
            <h2 className="font-heading text-xl font-bold text-foreground">
              အတည်ပြုချက် စောင့်ဆိုင်းနေပါသည်
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              သင့်အကောင့်ကို Admin မှ အတည်ပြုပြီးမှသာ သင်ခန်းစာများကို ကြည့်ရှုနိုင်ပါမည်။
            </p>
          </motion.div>
        ) : loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : lessons.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-md rounded-2xl border border-neon bg-card p-12 text-center glow-neon"
          >
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-accent" />
            <h2 className="font-heading text-xl font-bold text-foreground">
              သင်ခန်းစာများ မကြာမီ ရောက်လာပါမည်
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              AI GURU မှ သင်ခန်းစာအသစ်များကို ပြင်ဆင်နေပါသည်
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson, i) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(`/lessons/${lesson.id}`)}
                className="group cursor-pointer rounded-xl border border-neon bg-gradient-card p-6 transition-all hover:glow-neon"
              >
                <span className="mb-3 inline-block rounded-full border border-neon bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  {lesson.category}
                </span>
                <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-gradient-neon">
                  {lesson.title}
                </h3>
                {lesson.description && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {lesson.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Lessons;
