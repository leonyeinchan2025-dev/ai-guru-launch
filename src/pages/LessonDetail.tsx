import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, BookOpen } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  category: string;
  content: string | null;
  thumbnail_url: string | null;
}

const LessonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user || !id) return;
    const fetchLesson = async () => {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("id", id)
        .eq("is_published", true)
        .single();

      if (!error && data) setLesson(data);
      setLoading(false);
    };
    fetchLesson();
  }, [user, id]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pb-20 pt-28">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : !lesson ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-md rounded-2xl border border-neon bg-card p-12 text-center glow-neon"
          >
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-accent" />
            <h2 className="font-heading text-xl font-bold text-foreground">
              သင်ခန်းစာ မတွေ့ပါ
            </h2>
            <button
              onClick={() => navigate("/lessons")}
              className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              သင်ခန်းစာများသို့ ပြန်သွားမည်
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl"
          >
            <button
              onClick={() => navigate("/lessons")}
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              သင်ခန်းစာများသို့ ပြန်သွားမည်
            </button>

            <span className="mb-4 inline-block rounded-full border border-neon bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              {lesson.category}
            </span>

            <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              {lesson.title}
            </h1>

            {lesson.description && (
              <p className="mt-3 text-lg text-muted-foreground">
                {lesson.description}
              </p>
            )}

            <div className="mt-8 rounded-2xl border border-neon bg-gradient-card p-8">
              {lesson.content ? (
                <div className="prose prose-invert max-w-none whitespace-pre-wrap font-myanmar text-foreground leading-relaxed">
                  {lesson.content}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <BookOpen className="mx-auto mb-4 h-10 w-10 text-accent" />
                  <p className="text-muted-foreground">
                    ဤသင်ခန်းစာအတွက် အကြောင်းအရာများ မကြာမီ ထည့်သွင်းပါမည်
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default LessonDetail;
