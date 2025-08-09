"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { SettingsCard } from "./settings-card";

export const SettingsNav = () => {
  const pathname = usePathname();

  const items = [
    {
      title: "General",
      slug: "general",
      url: "/settings",
    },
    {
      title: "Account",
      slug: "account",
      url: "/settings/account",
    },
    {
      title: "Security",
      slug: "security",
      url: "/settings/security",
    },
  ];

  return (
    <div className="w-full flex flex-col justify-center ">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-[500px] mx-auto">
          {items.map((item) => (
            <TabsTrigger asChild value={item.slug} key={item.slug}>
              <Button variant={`ghost`} key={item.slug}>
                <span>{item.title}</span>
              </Button>
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="mx-auto w-[500px] py-4">
          <TabsContent value="general">
            <div>
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">General</h1>
                <Separator className="w-[400px]" />

                <SettingsCard />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="account">
            <div>
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Account</h1>
                <Separator className="" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div>
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Security</h1>
                <Separator className="" />
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
