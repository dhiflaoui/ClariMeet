"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const HomeView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(
    trpc.hello.queryOptions({
      text: `belga!`,
    })
  );
  const router = useRouter();
  const { data: session } = authClient.useSession();
  if (!session) {
    return <div>Please sign in to access the dashboard.</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>TRPC says: {data?.greeting}</p>
      <p>This is your dashboard.</p>
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: { onSuccess: () => router.push("/sign-in") },
          })
        }
      >
        Sign Out
      </Button>
    </div>
  );
};

export default HomeView;
