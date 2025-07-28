import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { ChatViewSidebar } from "@/modules/chat/components/chat-view-sidebar";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { HomeView } from "@/modules/home/views/home-view";

export default async function ChatViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      {!data ? (
        <HomeView />
      ) : (
        <SidebarProvider
          className="dark:bg-neutral-900 bg-neutral-100 h-screen"
          style={
            {
              // "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <ChatViewSidebar
            auth={true}
            name={data.user.name}
            email={data.user.email}
            image={data.user.image}
            variant="inset"
            className="border-r border-neutral-200 dark:border-neutral-800"
          />
          <SidebarInset className="bg-transparent relative shadow-none! m-0! rounded-none! border-none!">
            {children}
          </SidebarInset>
        </SidebarProvider>
      )}
    </>
  );
}
