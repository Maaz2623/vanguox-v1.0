import { createTRPCRouter } from '../init';
import { chatsRouter } from './procedures/chats.procedure';
export const appRouter = createTRPCRouter({
  chats: chatsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;