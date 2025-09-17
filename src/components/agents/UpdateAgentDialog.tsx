import ResponsiveDialog from "@/components/ResponsiveDialog";
import AgentForm from "./agentForm";
import { AgentGetOne } from "@/modules/agents/server/types";

interface NewAgentDialogProps {
  readonly open: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly initialValues?: AgentGetOne;
}

function UpdateAgentDialog({
  onOpenChange,
  open,
  initialValues,
}: NewAgentDialogProps) {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit an existing agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
}

export default UpdateAgentDialog;
