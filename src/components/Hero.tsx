import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import mentorImage from "@/assets/mentor.png";
import { useAuth } from "@/hooks/useAuth";

const Hero = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartLearning = () => {
    if (user) {
      navigate("/lessons");
    } else {
      navigate("/auth");
    }
  };

  return (
    <section id="hero" className="bg-gradient-hero relative min-h-screen overflow-hidden pt-20">
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(hsl(190 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(190 100% 50%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative mx-auto flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center gap-12 px-4 lg:flex-row lg:gap-8">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
          <div className="mb-4 inline-block rounded-full border border-neon bg-accent/10 px-4 py-1.5">
            <span className="font-myanmar text-xs text-accent">🚀 AI နည်းပညာ သင်ယူရန် အကောင်းဆုံးနေရာ</span>
          </div>

          <h1 className="mb-6 font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            <span className="text-foreground">AI Technology</span>
            <br />
            <span className="text-gradient-neon">Learning Platform</span>
          </h1>

          <p className="mx-auto mb-8 max-w-lg font-myanmar text-lg leading-relaxed text-muted-foreground lg:mx-0">
            AI နည်းပညာအား မြန်မာဘာသာဖြင့် လွယ်ကူစွာ လေ့လာနိုင်သည်။
            Machine Learning, Deep Learning, Computer Vision နှင့်
            အခြား AI နယ်ပယ်များကို အဆင့်ဆင့် သင်ယူလိုက်ပါ။
          </p>

          <motion.button
            onClick={handleStartLearning}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block rounded-xl bg-accent px-8 py-4 font-myanmar text-base font-semibold text-accent-foreground shadow-lg transition-shadow animate-pulse-glow hover:shadow-accent/40"
          >
            {user ? "စတင်လေ့လာမည်" : "ဝင်ရောက်မည်"}
          </motion.button>
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-1 justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-accent/10 blur-2xl" />
            <img
              src={mentorImage}
              alt="AI Mentor"
              className="relative z-10 h-auto max-h-[500px] w-auto rounded-2xl object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
