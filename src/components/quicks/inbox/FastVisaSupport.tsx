import { Icon } from "@/components/utils";
import { useQuickStore } from "@/store";
import { InboxModel, MessageModel, ValueSetter } from "@/types";
import { extractDate } from "@/utils";
import { ReactNode, useRef, useState } from "react";
import MessageCard from "./MessageCard";

interface FastVisaSupportProps {
  inbox: InboxModel;
  setShowChat: ValueSetter<boolean>;
}

export default function FastVisaSupport({
  inbox,
  setShowChat,
}: FastVisaSupportProps) {
  const setActiveQuick = useQuickStore((state) => state.setActive);

  return (
    <div className="flex flex-col justify-start text-black gap-2 absolute w-[480px] h-[480px] rounded-md bg-white">
      <div className="w-full sticky top-0 border-b border-black rounded-t-md bg-white z-10">
        <div className="flex gap-2 min-h-max py-4 px-4 items-center">
          <div
            className="pl-2 pr-1 cursor-pointer"
            onClick={() => setShowChat(false)}
          >
            <Icon name="arrow_left_black" width={16} />
          </div>
          <div className="flex flex-col flex-wrap overflow-hidden grow">
            <span className="text-14 font-bold text-blue-500 break-all leading-none">
              FastVisa Support
            </span>
          </div>
          <div
            className="justify-end cursor-pointer"
            onClick={() => setActiveQuick(null)}
          >
            <Icon name="close_black" width={16} />
          </div>
        </div>
      </div>

      <div className="flex flex-col grow gap-2 overflow-y-auto rounded-b-md pl-4 pr-1 pb-2">
        {[...Array(5)].map((_, i) => (
          <>
            <DateDivider date="2023-01-11" />
            <MessageCard
              message={{
                id: 1,
                inboxId: 1,
                senderId: 0,
                senderName: "FastVisaSupport",
                createdAt: "2023-01-11T04:43:00Z",
                body: "Hey There",
              }}
              handleReply={() => {}}
              hideOption
            />
            <MessageCard
              message={{
                id: 1,
                inboxId: 1,
                senderId: 1,
                senderName: "Corazon17",
                createdAt: "2023-01-11T04:43:00Z",
                body: "Hey There",
              }}
              handleReply={() => {}}
            />
          </>
        ))}
      </div>

      <div className="flex flex-col justify-between gap-2 sticky bottom-0 px-4 pb-2">
        {/* Waiting message */}
        <div className="flex w-full gap-1 items-center bg-[#E9F3FF] p-2 rounded">
          <div className="animate-spin">
            <Icon name="spinner_blue" width={24} />
          </div>
          <span className="text-14">
            Please wait while we connect you with one of our team
          </span>
        </div>

        <div className="grid gap-2 grid-cols-[1fr_80px]">
          <div className="grid relative w-full">
            <input
              placeholder="Type a new message"
              className="w-full border border-black rounded-b px-2 resize-none"
            />
          </div>

          <button className="h-8 px-2 py-1 rounded text-white bg-blue-500 self-end">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const DateDivider = ({ date }: { date: string }) => (
  <div className="flex relative w-full justify-center">
    <div className="absolute w-full h-1/2 border-b-2 border-black"></div>
    <span className="px-4 bg-white z-10">{date}</span>
  </div>
);
