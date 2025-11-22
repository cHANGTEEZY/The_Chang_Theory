import ProfileForm from "@/components/profile-form";
import { getUserServerSessionData } from "@/lib/utils/serverUser";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getUserServerSessionData();

  if (!session) {
    return redirect("/signin");
  }

  console.log("User Session Data:", session);

  return (
    <section className="content-container">
      <h1>Profile Page</h1>
      <ProfileForm userSessionData={session.user} />
    </section>
  );
};

export default ProfilePage;
