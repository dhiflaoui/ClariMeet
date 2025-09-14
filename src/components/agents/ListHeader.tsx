"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import NewAgentDialog from "./NewAgentDialog";
import { useState } from "react";

function ListHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  console.log("isDialogOpen", isDialogOpen);
  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-4 px-4 md:px-8 gap-y-4 flex flex-col">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon /> Add Agent
          </Button>
        </div>
      </div>
    </>
  );
}

export default ListHeader;
