import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://sydvxfmlcgdusxjnealn.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5ZHZ4Zm1sY2dkdXN4am5lYWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIxNTkzMzgsImV4cCI6MjAwNzczNTMzOH0.vsqB2HaZA-2f7lpPhMl7z0ellrstd2cLWgduglKbrak";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
