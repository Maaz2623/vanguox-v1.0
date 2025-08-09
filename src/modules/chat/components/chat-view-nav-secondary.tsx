"use client";

import * as React from "react";
import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatViewNavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: Icon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname();

  return (
    <>
      <SidebarGroup {...props}>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem className="">
              <SidebarMenuButton
                asChild
                className={cn(
                  "",
                  pathname === "/settings" &&
                    "dark:bg-neutral-800 bg-neutral-200 font-semibold"
                )}
              >
                <Link href={`/settings`}>
                  <SettingsIcon />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
