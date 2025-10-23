import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://djtvbxgdvjyeupbowhvw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqdHZieGdkdmp5ZXVwYm93aHZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNTUzMzAsImV4cCI6MjA3NjczMTMzMH0.a07XhcT1EJMBTPCPt3niOtapOMAewW73-kc2XII1TCQ"
);
