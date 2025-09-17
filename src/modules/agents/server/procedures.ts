import { db } from "@/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agents } from "@/db/schema";
import { agentsInsertSchema, agentsUpdateSchema } from "./schema";
import { z } from "zod"; // Fixed: removed 'default' import
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
  listAgents: protectedProcedure.query(async ({ ctx }) => {
    const agentsList = await db
      .select()
      .from(agents)
      .where(eq(agents.userId, ctx.auth.user.id));
    return agentsList;
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))
        );

      if (!existingAgent)
        throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" });

      return existingAgent;
    }),

  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [newAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();
      return newAgent;
    }),

  update: protectedProcedure
    .input(agentsUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      const { id, ...updateData } = input;
      const [updatedAgent] = await db
        .update(agents)
        .set(updateData)
        .where(and(eq(agents.id, id), eq(agents.userId, ctx.auth.user.id)))
        .returning();
      if (!updatedAgent)
        throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" });
      return updatedAgent;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const [removedAgent] = await db
        .delete(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id))
        )
        .returning();

      if (!removedAgent)
        throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" });

      return { success: true };
    }),
});
