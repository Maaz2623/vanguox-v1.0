"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <div className="h-full w-[15%] border-r px-2 border-neutral-800 flex flex-col gap-y-2">
      {items.map((item) => (
        <Button
          asChild
          variant={`ghost`}
          className={cn(
            "w-full text-start flex justify-start",
            pathname === item.url && "bg-accent"
          )}
          key={item.slug}
        >
          <Link href={item.url}>{item.title}</Link>
        </Button>
      ))}
    </div>
  );
};
