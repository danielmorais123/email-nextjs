import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://okezzkwmmqrarsfipcda.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZXp6a3dtbXFyYXJzZmlwY2RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMwMTcxNDAsImV4cCI6MTk4ODU5MzE0MH0.z2EZAO_WzNhvLWD_1i0HZaMfYGHf0lW_jmVNKyq7_UU"
);
