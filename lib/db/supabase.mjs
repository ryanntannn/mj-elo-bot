import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.SB_URL,
  process.env.SB_SERVICE_ROLE
);
