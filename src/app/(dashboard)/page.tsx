import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import HomeView from "@/components/dashboard/Home-view";

const page = async () => {
  let session;
  try {
    const headersList = await headers();
    session = await auth.api.getSession({
      headers: headersList,
    });
  } catch (error) {
    console.error("Error checking session:", error);
  }

  if (!session) {
    redirect("/sign-in");
  }
  return <HomeView />;
};

export default page;
