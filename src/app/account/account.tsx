"use client";
import Button from "@/components/Button";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

type Props = {
  user: User;
};

const Account = ({ user }: Props) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.refresh();
    } catch (e) {
      console.error("Impossible to logout", e);
    }
  };

  return (
    <>
      <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
        <h1 className="text-3xl font-bold leading-tight text-black sm:text-4xl mb-12">
          Your account
        </h1>
        <p>{user.email}</p>
        <Button onClick={handleSignOut}>Sign out</Button>
      </div>
    </>
  );
};

export default Account;
