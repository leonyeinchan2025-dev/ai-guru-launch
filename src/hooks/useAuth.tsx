import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Profile {
  username: string;
  email: string;
  avatar_url: string | null;
  is_approved: boolean;
}

type AppRole = 'admin' | 'moderator' | 'user';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const [{ data: profileData, error: profileError }, { data: roleData, error: roleError }] = await Promise.all([
        supabase
          .from("profiles")
          .select("username, email, avatar_url, is_approved")
          .eq("user_id", userId)
          .single(),
        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
          .eq("role", "admin")
          .maybeSingle(),
      ]);

      if (profileError) {
        console.error("Failed to fetch profile:", profileError);
      }

      if (roleError) {
        console.error("Failed to fetch admin role:", roleError);
      }

      setProfile(profileData ?? null);
      setIsAdmin(!!roleData);
    } catch (error) {
      console.error("Unexpected auth fetch error:", error);
      setProfile(null);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const fallbackTimeout = window.setTimeout(() => {
      setLoading(false);
    }, 2500);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        try {
          setLoading(true);
          setUser(session?.user ?? null);

          if (session?.user) {
            await fetchProfile(session.user.id);
          } else {
            setProfile(null);
            setIsAdmin(false);
          }
        } finally {
          setLoading(false);
        }
      }
    );

    (async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setIsAdmin(false);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      window.clearTimeout(fallbackTimeout);
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out failed:", error);
    }
  };

  return { user, profile, isAdmin, loading, signOut };
};
