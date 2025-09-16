"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LoadingState } from "../LoadingState";
import { ErrorState } from "../ErrorState";
import AgentIdViewHeader from "./AgentIdViewHeader";
import { GeneratedAvatar } from "../generated-avatar";
import { Badge } from "../ui/badge";
import { VideoIcon } from "lucide-react";

interface Props {
  agentId: string;
}

function AgentIdView({ agentId }: Props) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );
  return (
    <div className="flex-1 flex flex-col gap-y-4 pb-4 px-4 md:px-8">
      <AgentIdViewHeader
        agentId={agentId}
        agentName={data?.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />
      <div className="bg-white rounded-lg border">
        <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
          <div className="flex items-center gap-x-3">
            <GeneratedAvatar
              variant="botttsNeutral"
              seed={data?.name}
              className="size-10"
            />
            <h2 className="font-medium text-2xl">{data?.name}</h2>
          </div>
          <Badge
            variant="outline"
            className="flex items-center gap-x-2 [&>svg]:size-4"
          >
            <VideoIcon className="text-blue-700" />
            {data?.meetingCount}
            {data?.meetingCount > 1 ? "Meetings" : "Meeting"}
          </Badge>
          <div className="flex flex-col gap-y-4">
            <p className="font-medium text-lg">Instructions</p>
            <p className="text-neutral-800">{data?.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentIdView;

export const AgentIdLoadingView = () => {
  return (
    <LoadingState
      title="Loading Agent"
      description="This may take a few seconds"
    />
  );
};
export const AgentIdErrorView = () => {
  return (
    <ErrorState
      title="Error Loading Agent"
      description="This may take a few seconds"
    />
  );
};
