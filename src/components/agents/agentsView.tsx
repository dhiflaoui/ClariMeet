"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LoadingState } from "../LoadingState";
import { ErrorState } from "../ErrorState";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.listAgents.queryOptions());

  return (
    <div>
      <h1>Agents</h1>
      {JSON.stringify(data, null, 2)}
    </div>
  );
};

export const AgentsLoadingView = () => {
  return (
    <LoadingState
      title="Loading agents"
      description="This may take a few seconds"
    />
  );
};
export const AgentErrorView = () => {
  return (
    <ErrorState
      title="Loading agents"
      description="This may take a few seconds"
    />
  );
};
