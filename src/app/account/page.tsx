import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { RedirectType } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Account from "./account";

type Props = {};

const AccountPage = async (props: Props) => {
  const supabase = createServerActionClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login", RedirectType.replace);
  }

  return <Account user={user} />;
};

export default AccountPage;
