import { motion } from "framer-motion";

const steps = [
  { step: "01", title: "Python Basics", description: "Python ပရိုဂရမ်မင်း အခြေခံကို သင်ယူပါ" },
  { step: "02", title: "Math for AI", description: "AI အတွက် လိုအပ်သော သင်္ချာ အခြေခံများ" },
  { step: "03", title: "Machine Learning", description: "ML အယ်လဂိုရီသမ်များ သင်ယူပါ" },
  { step: "04", title: "Deep Learning", description: "Neural Networks နှင့် Deep Learning" },
  { step: "05", title: "Build Projects", description: "လက်တွေ့ ပရောဂျက်များ တည်ဆောက်ပါ" },
];

const Roadmap = () => {
  return (
    <section id="roadmap" className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Learning <span className="text-gradient-neon">Roadmap</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-myanmar text-muted-foreground">
            AI ပညာရှင်တစ်ဦး ဖြစ်လာရန် လမ်းကြောင်း
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-2xl">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-accent/60 via-accent/30 to-transparent md:left-1/2" />

          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative mb-10 flex items-start gap-6 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neon bg-background font-heading text-sm font-bold text-accent glow-neon md:mx-auto">
                {item.step}
              </div>
              <div className="bg-gradient-card rounded-xl border border-neon p-5 md:w-5/12">
                <h3 className="mb-1 font-heading text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="font-myanmar text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
