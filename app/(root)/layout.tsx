import Header from "@/components/header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export type userData = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  //   const session = await auth.api.getSession({
  //     headers: await headers(),
  //   });

  //   if (!session) {
  //     return redirect("/signin");
  //   }

  return (
    <section>
      <Header />
      {children}
    </section>
  );
};

export default RootLayout;
