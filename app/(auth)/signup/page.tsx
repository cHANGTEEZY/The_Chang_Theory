"use client";

import { SingUpAction } from "@/app/actions/auth";
import { useState } from "react";

const SignUpPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await SingUpAction(formData);
      if (response.success) {
        return console.log("Success", response);

        console.log("error", response);
      }
    } catch (error) {
      return console.log("error", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center h-screen flex-col"
    >
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="mt-10 border border-white p-4 cursor-pointer rounded-2xl"
      >
        Sign up
      </button>
    </form>
  );
};

export default SignUpPage;
