import { SettingsView } from "@/modules/settings/views/settings-view";
import React from "react";

interface Props {
  params: Promise<{
    settingsSlug: string;
  }>;
}

const SettingsPage = async ({ params }: Props) => {
  const { settingsSlug } = await params;
  return (
    <div className="flex items-center">
      <SettingsView slug={settingsSlug} />
    </div>
  );
};

export default SettingsPage;
