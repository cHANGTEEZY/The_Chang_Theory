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
    image: z
      .any()
      .optional()
      .refine(
        (files) => {
          if (!files || files.length === 0) return true;
          const file = files[0];
          return file && file.type.startsWith("image/");
        },
        {
          message: "Only image files are allowed",
        }
      ),
    password: z.string().optional().or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (
        data.password &&
        data.password.length > 0 &&
        data.password.length < 6
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Password must be at least 6 characters",
      path: ["password"],
    }
  )
  .refine(
    (data) => {
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

type UserSessionData = {
  name: string;
  email: string;
  image?: string | null;
};

const ProfileForm = ({
  userSessionData,
}: {
  userSessionData: UserSessionData | null;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountUpdateFormData>({
    resolver: zodResolver(AccountUpdateSchema),
    defaultValues: {
      username: userSessionData?.name || "",
      email: userSessionData?.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleAccountUpdate = (data: AccountUpdateFormData) => {
    const imageFile = data.image && data.image[0] ? data.image[0] : undefined;

    const formData = {
      username: data.username,
      email: data.email,
      image: imageFile,
      password: data.password || undefined,
      confirmPassword: data.confirmPassword || undefined,
    };

    console.log("Account Update Data:", formData);
    console.log("Image File:", imageFile);
  };

  return (
    <section>
      <form onSubmit={handleSubmit(handleAccountUpdate)} className="space-y-4 ">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            {...register("username")}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Profile Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            {...register("image")}
          />
          {errors.image && typeof errors.image.message === "string" && (
            <span className="text-red-500 text-sm">{errors.image.message}</span>
          )}
          <p className="text-xs text-muted-foreground">
            Upload a new profile image (optional)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">New Password (Optional)</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your new password"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
          <p className="text-xs text-muted-foreground">
            Leave blank to keep current password
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="mt-4">
          {isSubmitting ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </section>
  );
};

export default ProfileForm;
