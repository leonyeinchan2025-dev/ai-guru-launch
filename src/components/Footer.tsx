import logo from "@/assets/aiguru-logo.jpg";

const Footer = () => {
  return (
    <footer className="border-t border-neon bg-background/50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="AI GURU Logo" className="h-10 w-10 rounded-full" />
            <span className="font-heading text-lg font-bold tracking-wider text-foreground">
              AI <span className="text-gradient-neon">GURU</span>
            </span>
          </div>

          <p className="font-myanmar text-sm text-muted-foreground">
            AI Technology Learning – AI နည်းပညာအား မြန်မာဘာသာဖြင့် လွယ်ကူစွာ လေ့လာနိုင်သည်
          </p>

          <div className="flex gap-4">
            {["Facebook", "YouTube", "Telegram"].map((social) => (
              <a
                key={social}
                href="#"
                className="rounded-lg border border-neon bg-accent/5 px-4 py-2 text-xs text-muted-foreground transition-all hover:bg-accent/10 hover:text-accent"
              >
                {social}
              </a>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            AI GURU – Created by <span className="text-accent">Leo Nyein Chan</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
