"use client";
import { ErrorState } from "@/components/ErrorState";
function error() {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Please try again later"
    />
  );
}

export default error;
