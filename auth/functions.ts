import { supabase } from "../database/supabase";

export const signOut = async () => {
  await supabase.auth.signOut();
};

export const signInWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
  });
};

export const signInWithFacebook = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "facebook",
  });
};
