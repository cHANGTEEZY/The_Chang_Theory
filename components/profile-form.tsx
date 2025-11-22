"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const AccountUpdateSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    image: z.string().url("Invalid URL").optional().or(z.literal("")),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional()
      .or(z.literal("")),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      // Only check password match if password is provided
      if (data.password && data.password.length > 0) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

type AccountUpdateFormData = z.infer<typeof AccountUpdateSchema>;

const ProfileForm = ({ userSessionData }: { userSessionData: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountUpdateFormData>({
    resolver: zodResolver(AccountUpdateSchema),
    defaultValues: {
      username: userSessionData?.name || "",
      email: userSessionData?.email || "",
      image: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleAccountUpdate = (data: AccountUpdateFormData) => {
    console.log("Account Update Data:", JSON.stringify(data, null, 2));
  };

  return (
    <section>
      <form onSubmit={handleSubmit(handleAccountUpdate)} className="space-y-4 ">
        <div className="space-y-2 mt-7">
          <Label>Username</Label>
          <Input
            type="text"
            placeholder="Enter your username"
            {...register("username")}
          />
          {errors.username && (
            <span className="text-red-500">{errors.username.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label>Image</Label>
          <Input
            type="text"
            placeholder="Enter your image URL"
            {...register("image")}
          />
          {errors.image && (
            <span className="text-red-500">{errors.image.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Enter your new Password"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label>Confirm New Password</Label>
          <Input
            type="password"
            placeholder="Enter your new Password again"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <Button type="submit" className="mt-4">
          Update Profile
        </Button>
      </form>
    </section>
  );
};

export default ProfileForm;
