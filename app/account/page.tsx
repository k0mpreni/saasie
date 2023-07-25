import type { Database } from "@/lib/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type Props = {};

const Account = async (props: Props) => {
  const supabase = createServerActionClient({ cookies });
  const user = await supabase.auth.getUser();
  console.log(user);
  return <pre>{}</pre>;
};

export default Account;
