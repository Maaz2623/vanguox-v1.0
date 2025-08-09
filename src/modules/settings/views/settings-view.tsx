"use client";

import { Separator } from "@/components/ui/separator";

interface Props {
  slug: string;
}

export const SettingsView = ({ slug }: Props) => {
  console.log(slug);
  switch (slug) {
    case undefined:
      return <General />;
    case "account":
      return <Account />;
    case "security":
      return <Security />;
  }
};

const General = () => {
  return (
    <div>
      <div className="flex flex-col gap-y-2 w-[50vw]">
        <h1 className="text-2xl font-medium">General</h1>
        <Separator />
      </div>
    </div>
  );
};

const Account = () => {
  return (
    <div>
      <div className="flex flex-col gap-y-2 w-[50vw]">
        <h1 className="text-2xl font-medium">Account</h1>
        <Separator className="" />
      </div>
    </div>
  );
};
const Security = () => {
  return (
    <div>
      <div className="flex flex-col gap-y-2 w-[50vw]">
        <h1 className="text-2xl font-medium">Security</h1>
        <Separator />
      </div>
    </div>
  );
};
