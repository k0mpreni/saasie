"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { ReactElement, createContext } from "react";

//  createContext is not supported in Server Components
export const UserContext = createContext<User | null>(null);

export default async function Provider({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  const supabase = createClientComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
