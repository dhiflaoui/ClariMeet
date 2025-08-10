import SignUp from "@/components/auth/SignUp";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
const page = async () => {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    if (session?.user) {
      redirect("/");
    }
  } catch (error) {
    console.error("Error checking session:", error);
  }
  return <SignUp />;
};

export default page;
