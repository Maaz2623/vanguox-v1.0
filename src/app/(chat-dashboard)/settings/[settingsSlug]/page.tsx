import { SettingsView } from "@/modules/settings/views/settings-view";
import React from "react";

interface Props {
  params: Promise<{
    settingsSlug: string;
  }>;
}

const SettingsSlugPage = async ({ params }: Props) => {
  const { settingsSlug } = await params;

  return <SettingsView slug={settingsSlug} />;
};

export default SettingsSlugPage;
