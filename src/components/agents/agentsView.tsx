"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LoadingState } from "../LoadingState";
import { ErrorState } from "../ErrorState";
import { DataTable } from "./data-table";
import { columns } from "./Columns";
import { EmptyState } from "./EmptyState";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.listAgents.queryOptions());

  return (
    <div className="flex-1 flex flex-col gap-y-4 pb-4 px-4 md:px-8">
      <DataTable columns={columns} data={data} />
      {data.length === 0 && (
        <EmptyState
          title="Create your first agent "
          description="Create an agent to join your meetings.Each agent will follow your instructions and can interact with participants during the call"
        />
      )}
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
