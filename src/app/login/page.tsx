import type { Database } from "@/lib/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LoginForm from "./login-form";

const Login = async () => {
  const supabase = createServerActionClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <LoginForm session={session} />;
};
export default Login;
