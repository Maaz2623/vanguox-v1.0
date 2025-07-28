import { loadChat } from "@/ai/functions";
import { Chat } from "./chat";

interface Props {
  params: Promise<{
    testId: string;
  }>;
}

export default async function Page({ params }: Props) {

  const { testId } = await params;

  const messages = await loadChat(testId);

  return (
    <>
      <Chat testId={testId} initialMessages={messages} />
    </>
  );
}
