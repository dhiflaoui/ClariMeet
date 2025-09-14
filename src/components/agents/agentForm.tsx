import { agentsInsertSchema } from "@/modules/agents/server/schema";
import { AgentGetOne } from "@/modules/agents/server/types";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useCallback } from "react";

interface AgentFormProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

function AgentForm({
  onSuccess,
  onCancel,
  initialValues,
}: AgentFormProps = {}) {
  const trpc = useTRPC();
  const agent = initialValues?.[0];
  const isEdit = Boolean(agent?.id);

  const queryClient = useQueryClient();
  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.agents.listAgents.queryOptions());
        if (agent?.id) {
          queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: agent?.id })
          );
        }
        toast.success(`Agent ${isEdit ? "updated" : "created"} successfully!`);
        onSuccess?.();
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "Something went wrong";
        toast.error(`Failed to ${isEdit ? "update" : "create"} agent`, {
          description: errorMessage,
        });
      },
    })
  );
  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: agent?.name ?? "",
      instructions: agent?.instructions ?? "",
    },
  });
  const isPending = createAgent.isPending;
  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      console.log("edit");
    } else {
      createAgent.mutate(values);
    }
  };
  const handleCancel = useCallback(() => {
    form.reset();
    onCancel?.();
  }, [form, onCancel]);
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar
          seed={form.watch("name")}
          variant="botttsNeutral"
          className="border size-16"
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="e.g John"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={isPending}
                  rows={4}
                  className="resize-none"
                  placeholder="You are a helpful assistant "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button
              variant={"ghost"}
              disabled={isPending}
              type="button"
              onClick={handleCancel}
            >
              cancel
            </Button>
          )}
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                {isEdit ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{isEdit ? "Update Agent" : "Create Agent"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AgentForm;
