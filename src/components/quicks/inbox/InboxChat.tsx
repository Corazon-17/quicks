import { Icon } from "@/components/utils";
import { useInboxStore, useQuickStore } from "@/store";
import { InboxModel, MessageModel, ValueSetter } from "@/types";
import { extractDate } from "@/utils";
import { ReactNode, useRef, useState } from "react";
import MessageCard from "./MessageCard";

interface InboxChatProps {
  inbox: InboxModel;
  setShowChat: ValueSetter<boolean>;
}

export default function InboxChat({ inbox, setShowChat }: InboxChatProps) {
  const setActiveQuick = useQuickStore((state) => state.setActive);
  const addNewMessage = useInboxStore((state) => state.addNewMessage);

  const [textMessage, setTextMessage] = useState<string>("");
  const [replyMsg, setReplyMsg] = useState<MessageModel | null>(null);
  const [messages, setMessages] = useState<MessageModel[]>(inbox.messages);
  const [isNewMsg, setIsNewMsg] = useState<boolean>(true);

  const dateRef = useRef<string>();
  const participants = new Set(messages.map((message) => message.senderId))
    .size;

  const replyHandler = (message: MessageModel) => {
    setReplyMsg(message);
  };

  const closeReplyHandler = () => {
    setReplyMsg(null);
  };

  const sendMessageHandler = () => {
    if (textMessage.trim() !== "") {
      const date = new Date();
      const newMsg = {
        id: 0,
        inboxId: inbox.id,
        senderId: inbox.userId,
        senderName: "Corazon17",
        createdAt: date.toJSON(),
        body: textMessage,
        replyMessage: replyMsg ? replyMsg.body : undefined,
      };

      setTextMessage("");
      addNewMessage(newMsg, inbox.id);
      setMessages([...messages, newMsg]);
      setReplyMsg(null);
    }
  };

  return (
    <div className="flex flex-col justify-start text-black gap-2 absolute w-[560px] h-[480px] fhd:w-[734px] fhd:h-[737px] rounded-md bg-white">
      <div className="w-full sticky top-0 border-b border-black rounded-t-md bg-white z-10">
        <div className="flex gap-[18.43px] min-h-max py-4 px-[28px] items-center">
          <div className="cursor-pointer" onClick={() => setShowChat(false)}>
            <Icon name="arrow_left_black" width={16} />
          </div>
          <div className="flex flex-col flex-wrap overflow-hidden grow">
            <span className="text-16 font-bold text-[#2F80ED] break-all leading-none">
              {inbox.name}
            </span>
            <span className="text-12 pt-1">{participants} Participants</span>
          </div>
          <div
            className="justify-end cursor-pointer"
            onClick={() => setActiveQuick(null)}
          >
            <Icon name="close_black" width={14} />
          </div>
        </div>
      </div>

      <div className="flex flex-col grow gap-2 overflow-y-auto rounded-b-md pl-[29.02px] pr-[20px] pb-2">
        {messages.map((message, i) => {
          let dateDivider: ReactNode = "";

          const date = extractDate(message.createdAt);
          if (date !== dateRef.current) {
            dateDivider = <DateDivider date={date as string} />;
            dateRef.current = date;
          }

          if (i === messages.length - 1) {
            dateDivider = <NewMessageDivider />
          }

          return (
            <div key={i}>
              {dateDivider}
              <MessageCard message={message} handleReply={replyHandler} />
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center gap-2 sticky bottom-0 px-[20px] pt-[5px] pb-[10px] fhd:pt-[25px] fhd:pb-[19px]">
        <div className="grid relative w-full">
          {replyMsg && (
            <Reply message={replyMsg} handleClose={closeReplyHandler} />
          )}
          <input
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            placeholder="Type a new message"
            className="h-[40px] outline-none rounded-md w-full text-[#333333] placeholder-[#333333] border border-[#828282] rounded-b px-2"
          />
        </div>

        <button
          onClick={() => sendMessageHandler()}
          className="h-[40px] px-[21.01px] rounded text-white bg-blue-500 self-end"
        >
          Send
        </button>
      </div>

      {isNewMsg && (
        <div
          className="grid absolute w-full z-50 px-4 left-0 bottom-[68px]"
          onClick={() => setIsNewMsg(false)}
        >
          {/* New Message */}
          <span className="font-bold w-max cursor-pointer place-self-center px-2 py-1 text-blue-600 bg-blue-100 rounded-md">
            New Message
          </span>
        </div>
      )}
    </div>
  );
}

const DateDivider = ({ date }: { date: string }) => (
  <div className="flex relative w-full justify-center my-4">
    <div className="absolute w-full h-1/2 border-b-2 border-black"></div>
    <span className="px-4 bg-white z-10">{date}</span>
  </div>
);

const NewMessageDivider = () => (
  <div className="flex relative w-full justify-center my-4">
    <div className="absolute w-full h-1/2 border-b-2 border-[#EB5757]"></div>
    <span className="px-4 bg-white z-10 text-[#EB5757] font-bold">New Message</span>
  </div>
);

const Reply = ({
  message,
  handleClose,
}: {
  message: MessageModel;
  handleClose: () => void;
}) => {
  return (
    <div className="flex absolute bottom-[35px] z-[100] w-full text-12 bg-blue-200 px-2 py-2 border border-[#828282] rounded">
      <div className="grid grid-cols-[1fr_24px] w-full">
        <div className="grid gap-[1px]">
          <span className="font-bold">Replying to {message.senderName}</span>
          <p className="leading-tight">{message.body}</p>
        </div>
        <div
          className="self-start justify-self-end pr-1 cursor-pointer"
          onClick={() => handleClose()}
        >
          <Icon name="close_black" width={12} />
        </div>
      </div>
    </div>
  );
};
