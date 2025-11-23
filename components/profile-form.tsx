"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AccountUpdateSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    image: z
      .any()
      .optional()
      .refine(
        (files) => {
          if (!files || files.length === 0) return true;
          if (files instanceof FileList) {
            const file = files[0];
            return file && file.type.startsWith("image/");
          }
          return true;
        },
        {
          message: "Only image files are allowed",
        }
      ),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine(
    (data) => {
      if (data.password !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

type AccountUpdateFormData = z.infer<typeof AccountUpdateSchema>;

type UserSessionData = {
  name: string;
  email: string;
  image?: string | null;
  createdAt: string;
  emailVerified: boolean;
};

const ProfileForm = ({
  userSessionData,
}: {
  userSessionData: UserSessionData | null;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountUpdateFormData>({
    resolver: zodResolver(AccountUpdateSchema),
    mode: "onChange",
    defaultValues: {
      username: userSessionData?.name || "",
      email: userSessionData?.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleAccountUpdate = async (data: AccountUpdateFormData) => {
    try {
      const imageFile = data.image && data.image[0] ? data.image[0] : undefined;

      const formData = {
        username: data.username,
        email: data.email,
        image: imageFile,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Profile updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleAccountUpdate)}
      className="space-y-4 py-4"
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            {...register("username")}
            className={errors.username ? "border-red-500" : ""}
          />
          {errors.username && (
            <p className="text-red-500 text-sm font-medium">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="image">Profile Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            {...register("image")}
            className={errors.image ? "border-red-500" : ""}
          />
          {errors.image && typeof errors.image.message === "string" && (
            <p className="text-red-500 text-sm font-medium">
              {errors.image.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Upload a new profile image (optional)
          </p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your new password"
            {...register("password")}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <p className="text-red-500 text-sm font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            {...register("confirmPassword")}
            className={errors.confirmPassword ? "border-red-500" : ""}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm font-medium">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
