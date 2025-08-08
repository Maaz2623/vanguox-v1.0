import { createTRPCRouter } from '../init';
import { filesRouter } from '../procedures/files.procedure';
export const appRouter = createTRPCRouter({
  files: filesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;