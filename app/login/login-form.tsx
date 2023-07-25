"use client";

import type { Database } from "@/lib/database.types";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const LoginForm = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const signInWithGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: "/pricing" },
      });
      router.refresh();
    } catch (e) {
      console.error("Impossible to login:", e);
    }
  };

  const signInWithGithub = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo: "/pricing" },
      });
      router.refresh();
    } catch (e) {
      console.error("Impossible to login:", e);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      console.log("tutu");
      router.refresh();
    } catch (e) {
      console.error("Impossible to logout", e);
    }
  };

  if (session) {
    return <button onClick={handleSignOut}>Logout</button>;
  }
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 bg-gray-50 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
          <h1 className="text-3xl font-bold leading-tight text-black sm:text-4xl mb-12">
            Sign in to APP NAME
          </h1>

          <div className="mt-3 space-y-3">
            <button
              onClick={signInWithGoogle}
              type="button"
              className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
            >
              <div className="absolute inset-y-0 left-0 p-4">
                <svg
                  className="w-6 h-6 text-rose-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
                </svg>
              </div>
              Sign in with Google
            </button>

            <button
              onClick={signInWithGithub}
              type="button"
              className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
            >
              <div className="absolute inset-y-0 left-0 p-4">
                <svg
                  className="w-6 h-6 text-[#2563EB]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
                </svg>
              </div>
              Sign in with Github
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
