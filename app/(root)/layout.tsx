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

import Footer from "@/components/footer";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  //   const session = await auth.api.getSession({
  //     headers: await headers(),
  //   });

  //   if (!session) {
  //     return redirect("/signin");
  //   }

  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </section>
  );
};

export default RootLayout;
