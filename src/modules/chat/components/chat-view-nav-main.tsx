"use client";

import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ChatViewNavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              onClick={() => router.push(`/`)}
              tooltip="Quick Create"
              className="bg-primary transition-colors duration-300 text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>New Chat</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <div key={item.url}>
              {item.title === "History" ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={false}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <ScrollArea className="h-[200px]">
                        <SidebarMenuSub>
                          <SidebarMenuSubItem key={Math.random()}>
                            <SidebarMenuSubButton asChild>
                              <a href={`/`}>
                                <span>{"Chat 1"}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>{" "}
                          <SidebarMenuSubItem key={Math.random()}>
                            <SidebarMenuSubButton asChild>
                              <a href={`/`}>
                                <span>{"Chat 1"}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>{" "}
                          <SidebarMenuSubItem key={Math.random()}>
                            <SidebarMenuSubButton asChild>
                              <a href={`/`}>
                                <span>{"Chat 1"}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>{" "}
                          <SidebarMenuSubItem key={Math.random()}>
                            <SidebarMenuSubButton asChild>
                              <a href={`/`}>
                                <span>{"Chat 1"}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>{" "}
                          <SidebarMenuSubItem key={Math.random()}>
                            <SidebarMenuSubButton asChild>
                              <a href={`/`}>
                                <span>{"Chat 1"}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>{" "}
                          <SidebarMenuSubItem key={Math.random()}>
                            <SidebarMenuSubButton asChild>
                              <a href={`/`}>
                                <span>{"Chat 1"}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>{" "}
                          <SidebarMenuSubItem key={Math.random()}>
                            <SidebarMenuSubButton asChild>
                              <a href={`/`}>
                                <span>{"Chat 1"}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>{" "}
                          <SidebarMenuSubItem key={Math.random()}>
                            <SidebarMenuSubButton asChild>
                              <a href={`/`}>
                                <span>{"Chat 1"}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>{" "}
                          <SidebarMenuSubItem key={Math.random()}>
                            <SidebarMenuSubButton asChild>
                              <a href={`/`}>
                                <span>{"Chat 1"}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>{" "}
                          <SidebarMenuSubItem key={Math.random()}>
                            <SidebarMenuSubButton asChild>
                              <a href={`/`}>
                                <span>{"Chat 1"}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>{" "}
                          <SidebarMenuSubItem key={Math.random()}>
                            <SidebarMenuSubButton asChild>
                              <a href={`/`}>
                                <span>{"Chat 1"}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </ScrollArea>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </div>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
