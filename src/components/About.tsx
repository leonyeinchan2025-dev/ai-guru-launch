import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            AI <span className="text-gradient-neon">ဆိုတာဘာလဲ?</span>
          </h2>
          <p className="mt-6 font-myanmar text-lg leading-relaxed text-muted-foreground">
            Artificial Intelligence (AI) ဆိုသည်မှာ လူသားများကဲ့သို့ တွေးခေါ်နိုင်ပြီး
            ဆုံးဖြတ်ချက်များ ချနိုင်သော ကွန်ပျူတာ စနစ်များကို ဆိုလိုပါသည်။
            AI သည် ဒေတာများကို ခွဲခြမ်းစိတ်ဖြာပြီး ပုံစံများကို ရှာဖွေကာ
            ကြိုတင်ခန့်မှန်းမှုများ ပြုလုပ်နိုင်ပါသည်။
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-card rounded-xl border border-neon p-6 text-left"
            >
              <h3 className="mb-3 font-heading text-sm font-semibold text-accent">Machine Learning</h3>
              <p className="font-myanmar text-sm leading-relaxed text-muted-foreground">
                Machine Learning သည် ကွန်ပျူတာများအား ဒေတာမှ သင်ယူနိုင်စေသော AI ၏
                အခွဲတစ်ခု ဖြစ်ပါသည်။ ပရိုဂရမ်အား တိုက်ရိုက် ညွှန်ကြားစရာ မလိုဘဲ
                ဒေတာပုံစံများမှ သင်ယူပါသည်။
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-card rounded-xl border border-neon p-6 text-left"
            >
              <h3 className="mb-3 font-heading text-sm font-semibold text-accent">Deep Learning</h3>
              <p className="font-myanmar text-sm leading-relaxed text-muted-foreground">
                Deep Learning သည် Neural Networks ကို အသုံးပြု၍ ရှုပ်ထွေးသော
                ပြဿနာများကို ဖြေရှင်းနိုင်သော ML ၏ အဆင့်မြင့် နည်းပညာ ဖြစ်ပါသည်။
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
