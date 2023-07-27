import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type Props = {};

const Account = async (props: Props) => {
  const supabase = createServerActionClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <div>{JSON.stringify(user)}</div>;
};

export default Account;
