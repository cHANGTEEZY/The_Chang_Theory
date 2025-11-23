import ProfileForm from "@/components/profile-form";
import { getUserServerSessionData } from "@/lib/utils/serverUser";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Mail, User, CalendarDays } from "lucide-react";

const ProfilePage = async () => {
  const session = await getUserServerSessionData();

  if (!session) {
    return redirect("/signin");
  }

  const user = session.user;
  const initials = user.name
    ? user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "U";

  return (
    <div className="container max-w-7xl mx-auto py-10 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card className="h-fit">
          <CardHeader className="relative overflow-hidden pb-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-50" />
            <div className="relative z-10 flex flex-col items-center gap-4 pt-4">
              <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                <AvatarImage src={user.image || ""} alt={user.name} />
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Role:</span>
              <Badge variant="secondary" className="ml-auto">
                User
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Email Verified:</span>
              <Badge
                variant={user.emailVerified ? "default" : "destructive"}
                className="ml-auto"
              >
                {user.emailVerified ? "Verified" : "Unverified"}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Joined:</span>
              <span className="ml-auto text-muted-foreground">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full mt-4" variant="outline">
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <ProfileForm
                  userSessionData={{
                    ...user,
                    createdAt: new Date(user.createdAt).toISOString(),
                  }}
                />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
            <CardDescription>
              Your recent activity and account statistics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border p-4 bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    Total Posts
                  </span>
                  <span className="text-2xl font-bold">0</span>
                </div>
              </div>
              <div className="rounded-lg border p-4 bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    Comments
                  </span>
                  <span className="text-2xl font-bold">0</span>
                </div>
              </div>
              <div className="rounded-lg border p-4 bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-muted-foreground">
                    Likes
                  </span>
                  <span className="text-2xl font-bold">0</span>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No recent activity</h3>
              <p className="text-sm text-muted-foreground mt-2">
                You haven't performed any activities yet. Start by creating a post!
              </p>
              <Button className="mt-4" variant="secondary">
                Create Post
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
