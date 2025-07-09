/// <reference types="vite/client" />

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rbrltczejudsoxphrxnq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJicmx0Y3planVkc294cGhyeG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MTkyODcsImV4cCI6MjA2NzE5NTI4N30.FhwbiJoQ4sUKM8ep4jDTBP2OtfZrJ7DgB2NHf6X-BTU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
