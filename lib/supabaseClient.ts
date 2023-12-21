import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

const supabaseUrl = "https://tylyxokgbwztevuosixo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5bHl4b2tnYnd6dGV2dW9zaXhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI1NDE1OTIsImV4cCI6MjAxODExNzU5Mn0.HNJiF5CTPCO6m5m90-QWJg2h-oI9rH9YKxjFXVaV4nM";
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
