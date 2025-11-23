"use client";
import Link from "next/link";
import { SingUpAction } from "@/app/actions/auth";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const signUpSchema = z
  .object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const handlePress = async (data: SignUpFormData) => {
    setIsLoading(true);
    const { name, email, password } = data;
    try {
      const response = await SingUpAction({ name, email, password });
      if (response.success) {
        toast.success("Account created successfully!");
        reset();
        router.replace("/signin");
      } else {
        toast.error("Failed to create account", {
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
        <h1 className="text-3xl font-bold text-white">Create Account</h1>
        <p className="text-slate-400">Join us today and get started</p>
      </div>

      <form onSubmit={handleSubmit(handlePress)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-200">
            Full Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Sushank Gurung"
            {...register("name")}
            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 transition-colors"
          />
          {errors.name && (
            <p className="text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-200">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="sushank@example.com"
            {...register("email")}
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

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-slate-200">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 transition-colors"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 mt-6"
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-slate-400">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUpPage;
