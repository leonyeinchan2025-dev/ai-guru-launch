import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, XCircle, Trash2, Shield, Ban } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface UserProfile {
  id: string;
  user_id: string;
  username: string;
  email: string;
  is_approved: boolean;
  created_at: string;
}

const AdminPanel = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, user_id, username, email, is_approved, created_at")
      .order("created_at", { ascending: false });

    if (!error && data) setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user && isAdmin) fetchUsers();
  }, [user, isAdmin]);

  // Realtime: listen for new user registrations
  useEffect(() => {
    if (!user || !isAdmin) return;
    const channel = supabase
      .channel('admin-new-users')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'profiles' },
        (payload) => {
          const newUser = payload.new as UserProfile;
          toast.info(`အသုံးပြုသူအသစ် "${newUser.username}" စာရင်းသွင်းပြီးပါပြီ`, {
            duration: 8000,
          });
          fetchUsers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isAdmin]);

  const handleApprove = async (userId: string, approve: boolean) => {
    const { error } = await supabase
      .from("profiles")
      .update({ is_approved: approve })
      .eq("user_id", userId);

    if (error) {
      toast.error("လုပ်ဆောင်မှု မအောင်မြင်ပါ");
    } else {
      toast.success(approve ? "အတည်ပြုပြီးပါပြီ" : "ပိတ်ပင်ပြီးပါပြီ");
      fetchUsers();
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("ဤ user ကို ဖျက်မည်မှာ သေချာပါသလား?")) return;

    const { error } = await supabase.functions.invoke("admin-delete-user", {
      body: { userId },
    });

    if (error) {
      toast.error("ဖျက်၍ မရပါ");
    } else {
      toast.success("ဖျက်ပြီးပါပြီ");
      fetchUsers();
    }
  };

  if (authLoading || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pb-20 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-accent" />
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Admin <span className="text-gradient-neon">Panel</span>
            </h1>
          </div>
          <p className="text-muted-foreground">User များကို စီမံခန့်ခွဲပါ</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-neon bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-muted-foreground font-medium">Username</th>
                  <th className="px-4 py-3 text-left text-muted-foreground font-medium">Email</th>
                  <th className="px-4 py-3 text-left text-muted-foreground font-medium">ရက်စွဲ</th>
                  <th className="px-4 py-3 text-left text-muted-foreground font-medium">အခြေအနေ</th>
                  <th className="px-4 py-3 text-right text-muted-foreground font-medium">လုပ်ဆောင်ချက်</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-foreground font-medium">{u.username}</td>
                    <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {u.is_approved ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400">
                          <CheckCircle className="h-3 w-3" /> Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs text-yellow-400">
                          <XCircle className="h-3 w-3" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {!u.is_approved ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleApprove(u.user_id, true)}
                            className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleApprove(u.user_id, false)}
                            className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
                          >
                            <Ban className="h-4 w-4 mr-1" />
                            Ban
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(u.user_id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;
