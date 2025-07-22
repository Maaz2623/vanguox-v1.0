import { authClient } from "@/lib/auth-client";
import { NewChatTemplateView } from "@/modules/home/views/new-chat-template-view";
import React from "react";

const HomePage = async () => {
  const { data } = await authClient.getSession();

  return <>{!data && <NewChatTemplateView />}</>;
};

export default HomePage;
