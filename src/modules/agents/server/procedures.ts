import { db } from "@/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agents } from "@/db/schema";
import { agentsInsertSchema } from "./schema";
import z from "zod";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  listAgents: protectedProcedure.query(async () => {
    const agentsList = await db.select().from(agents);
    return agentsList;
  }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const agentsList = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id));
      return agentsList;
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
});
