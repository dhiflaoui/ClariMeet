import {
  AgentErrorView,
  AgentsLoadingView,
  AgentsView,
} from "@/components/agents/agentsView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
async function page() {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(trpc.agents.list.queryOptions());
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsLoadingView />}>
          <ErrorBoundary fallback={<AgentErrorView />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}

export default page;
