"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function SingUpAction({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
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

export async function SignInAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
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

export async function SignOutAction() {
  try {
    const response = await auth.api.signOut({
      headers: await headers(),
    });
    return { success: true, message: response && "Signed out successfully" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error signing out!",
    };
  }
}
