"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function SingUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: email.split("@")[0],
      },
      headers: await headers(),
    });
    return {
      success: true,
      message: response && "Account created successfully!",
    };
  } catch (error) {
    if (error instanceof Error && error.message.includes("already exitsts")) {
      return {
        success: false,
        message: "Account with this email already exists",
      };
    }
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error creating account!",
    };
  }
}

export async function SignInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await auth.api.signInEmail({
      body: {
        email: email,
        password: password,
      },
      headers: await headers(),
    });

    return { success: true, message: response };
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Invalid email or password")
    ) {
      return {
        success: false,
        message: "Invalid credentials. Please enter correct email or password",
      };
    }

    return {
      success: false,
      message: "Invalid credentials. Please enter correct email or password",
    };
  }
}
