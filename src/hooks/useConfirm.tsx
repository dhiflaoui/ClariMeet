import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import ResponsiveDialog from "../components/ResponsiveDialog";

function useConfirm(
  title: string,
  description: string
): [() => JSX.Element, () => Promise<unknown>] {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);
  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };
  const handleClose = () => {
    setPromise(null);
  };
  const handleConfirm = () => {
    if (promise) {
      promise?.resolve(true);
      handleClose();
    }
  };
  const handleCancel = () => {
    if (promise) {
      promise?.resolve(false);
      handleClose();
    }
  };
  const ConfirmDialog = () => {
    return (
      <ResponsiveDialog
        open={promise != null}
        onOpenChange={handleClose}
        title={title}
        description={description}
      >
        <div className="flex pt-4 w-full flex-col-reverse lg:flex-row gap-y-2 gap-x-2 justify-end">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-full lg:w-auto"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            className="w-full lg:w-auto"
          >
            Confirm
          </Button>
        </div>
      </ResponsiveDialog>
    );
  };
  return [ConfirmDialog, confirm];
}
export default useConfirm;
