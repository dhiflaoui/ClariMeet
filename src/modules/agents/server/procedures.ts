import { db } from "@/db";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import { agents } from "@/db/schema";

export const agentsRouter = createTRPCRouter({
  list: baseProcedure.query(async () => {
    const agentsList = await db.select().from(agents);
    //   .where((agent) => agent.userId.eq(ctx.userId));
    return agentsList;
  }),
});
