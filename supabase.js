import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pbpscijrlnxlmvtaxjoz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicHNjaWpybG54bG12dGF4am96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA1ODM5MDksImV4cCI6MjAyNjE1OTkwOX0.V2q-GNcnaBXweHt6M8fK2_cqB2k6CPl6iH_ig-Jt320";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
