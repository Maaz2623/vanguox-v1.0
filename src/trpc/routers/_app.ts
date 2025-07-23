import { createTRPCRouter } from '../init';
import { chatsRouter } from './procedures/chats.procedure';
import { messagesRouter } from './procedures/messages.procedure';
export const appRouter = createTRPCRouter({
  chats: chatsRouter,
  messages: messagesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;