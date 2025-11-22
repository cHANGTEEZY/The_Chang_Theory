// Updated modern UI version of your Header component
"use client";

import { Button } from "./ui/button";
import {
  Moon,
  Sun,
  LogOut,
  Settings,
  LayoutDashboard,
  FileText,
  Plus,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/store";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { userSessionData, fetchUserSession, clearUserSession, isLoading } =
    useUserStore();

  useEffect(() => {
    if (!userSessionData && !isLoading) {
      fetchUserSession();
    }
  }, [userSessionData, isLoading, fetchUserSession]);

  const handleLogout = async () => {
    await authClient.signOut();
    clearUserSession();
    router.push("/signin");
    router.refresh();
  };

  const isLoggedIn = !!userSessionData?.user;
  const userData = userSessionData?.user;

  return (
    <header className="py-4 mb-10 sticky top-0 z-50 backdrop-blur-lg  bg-slate-500 dark:bg-gray-900/60 shadow-sm">
      <nav className="content-container flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer hover:opacity-80 transition">
            TheChange<span className="text-orange-400">Theory</span>
          </h1>
        </Link>

        <div className="flex gap-4 items-center">
          {!isLoggedIn && (
            <div className="flex gap-2 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-sm border dark:border-gray-700">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setTheme("dark")}
                className="rounded-full cursor-pointer"
              >
                <Moon size={18} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setTheme("light")}
                className="rounded-full cursor-pointer"
              >
                <Sun size={18} />
              </Button>
            </div>
          )}

          {!isLoggedIn ? (
            <div className="flex gap-3">
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="rounded-full hover:bg-orange-400 hover:text-white transition cursor-pointer"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="rounded-full bg-orange-400 hover:bg-orange-500 text-white transition cursor-pointer">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer h-10 w-10 rounded-full ring-2 ring-orange-400/50 hover:ring-orange-500/50 transition">
                  <AvatarImage
                    src={userData?.image || "https://github.com/shadcn.png"}
                    alt="User Avatar"
                  />
                  <AvatarFallback className="rounded-full bg-orange-400 text-white">
                    U
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-60 rounded-xl shadow-lg p-2 border dark:border-gray-700"
              >
                <DropdownMenuLabel className="font-semibold flex flex-col gap-0.5">
                  {userData?.name || "User"}
                  <span className="text-xs text-muted-foreground">
                    {userData?.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex gap-2 items-center">
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/my-posts" className="flex gap-2 items-center">
                    <FileText size={16} /> My Posts
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/blog" className="flex gap-2 items-center">
                    <Plus size={16} /> Create Post
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex gap-2 items-center">
                    <User size={16} /> Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun size={16} /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon size={16} /> Dark Mode
                    </>
                  )}
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex gap-2 items-center">
                    <Settings size={16} /> Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 flex gap-2 items-center hover:bg-red-100 dark:hover:bg-red-950 cursor-pointer rounded-lg"
                >
                  <LogOut size={16} /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
