import { motion } from "framer-motion";
import { Brain, Eye, MessageSquare, Bot } from "lucide-react";

const fields = [
  {
    icon: Brain,
    title: "Machine Learning",
    description: "ဒေတာများမှ သင်ယူနိုင်သော အယ်လဂိုရီသမ်များကို တည်ဆောက်ခြင်း။ စက်များအား လူသားကဲ့သို့ သင်ယူနိုင်စေခြင်း။",
  },
  {
    icon: Eye,
    title: "Computer Vision",
    description: "ရုပ်ပုံနှင့် ဗီဒီယိုများကို နားလည်နိုင်သော AI စနစ်များ တည်ဆောက်ခြင်း။",
  },
  {
    icon: MessageSquare,
    title: "Natural Language Processing",
    description: "စာသားနှင့် စကားပြောဆိုမှုကို နားလည်နိုင်သော AI နည်းပညာ။",
  },
  {
    icon: Bot,
    title: "Robotics",
    description: "AI နှင့် စက်ရုပ်နည်းပညာ ပေါင်းစပ်ခြင်းဖြင့် အလိုအလျောက် လုပ်ဆောင်နိုင်သော စနစ်များ။",
  },
];

const AIFields = () => {
  return (
    <section id="fields" className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            AI <span className="text-gradient-neon">နယ်ပယ်များ</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-myanmar text-muted-foreground">
            AI နည်းပညာ၏ အဓိက နယ်ပယ်များကို လေ့လာပါ
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fields.map((field, i) => (
            <motion.div
              key={field.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-gradient-card rounded-xl border border-neon p-6 transition-all hover:glow-neon"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <field.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 font-heading text-sm font-semibold tracking-wide text-foreground">
                {field.title}
              </h3>
              <p className="font-myanmar text-sm leading-relaxed text-muted-foreground">
                {field.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIFields;
