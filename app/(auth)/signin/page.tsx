"use client";
import { SignInAction } from "@/app/actions/auth";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const singInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof singInSchema>;

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const redirect = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(singInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleClick = async (data: SignInFormData) => {
    setIsLoading(true);
    const { email, password } = data;
    try {
      const response = await SignInAction({
        email,
        password,
      });
      if (response.success) {
        toast.success("Signed in successfully!");
        redirect.replace("/");
      } else {
        toast.error("Invalid credentials", {
          description: response.message as string,
        });
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
        <p className="text-slate-400">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit(handleClick)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-200">
            Email Address
          </Label>
          <Input
            id="email"
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 transition-colors"
          />
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-200">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 transition-colors"
          />
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 mt-6"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignInPage;
