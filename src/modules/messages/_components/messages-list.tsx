import { SiteHeader } from "@/app/(chat-dashboard)/_components/site-header";
import { ScrollArea } from "@/components/ui/scroll-area";

export const MessagesList = () => {
  return (
    <div className="w-full h-full overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full bg-white">
        <SiteHeader />
      </div>
      <ScrollArea className="w-full h-[570px] pt-14">
        <div className="w-[70%] mx-auto h-full pb-[40vh]">
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
          <div className="my-6">Messages</div>
        </div>
      </ScrollArea>
    </div>
  );
};
