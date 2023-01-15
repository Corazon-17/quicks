import { Icon } from "@/components/utils";
import { useUserStore } from "@/store";
import { MessageModel, ValueSetter } from "@/types";
import { extractTime } from "@/utils";
import { useState } from "react";

interface MessageCardProps {
  message: MessageModel;
  handleReply: (message: MessageModel) => void;
  hideOption?: boolean;
}

export default function MessageCard({
  message,
  handleReply,
  hideOption,
}: MessageCardProps) {
  const activeUserId = useUserStore((state) => state.id);

  const yourself = activeUserId === message.senderId;
  const time = extractTime(message.createdAt);
  const [toggleOpt, setToggleOpt] = useState<boolean>(false);

  return (
    <div className="flex flex-nowrap text-[#4F4F4F]">
      <div className="flex flex-col w-full">
        <span
          className={`w-full font-bold text-[#E5A443] ${
            yourself && "text-end text-[#9B51E0]"
          }`}
        >
          {yourself ? "You" : message.senderName}
        </span>

        {message.replyMessage && (
          <div
            className={`flex ${
              yourself && "flex-row-reverse self-end"
            } items-start gap-1 w-80`}
          >
            <div className="grid gap-1 w-full text-14 border p-2 rounded-md bg-[#FCEED3]">
              <p>{message.replyMessage}</p>
            </div>
          </div>
        )}

        <div
          className={`flex ${
            yourself && "flex-row-reverse self-end"
          } items-start gap-1 w-80`}
        >
          <div
            className={`grid gap-1 w-full text-14 border p-2 rounded-md ${
              yourself ? "bg-[#EEDCFF]" : "bg-[#FCEED3]"
            }`}
          >
            <p>{message.body}</p>
            <span>{time}</span>
          </div>
          <div className="grid relative">
            {!hideOption && (
              <button onClick={() => setToggleOpt(!toggleOpt)}>
                <Icon name="other" width={16} />
              </button>
            )}

            {toggleOpt && (
              <div
                className={`grid absolute w-24 cursor-pointer ${
                  yourself ? "left-0" : "right-0"
                } top-4 bg-white border border-[#BDBDBD] divide-y divide-[#BDBDBD] rounded`}
              >
                {yourself ? (
                  <>
                    <span className="px-2 py-1 text-[#2F80ED]">Edit</span>
                    <span className="px-2 py-1 text-[#EB5757]">Delete</span>
                  </>
                ) : (
                  <>
                    <span className="px-2 py-1 text-[#2F80ED]">Share</span>
                    <span
                      className="px-2 py-1 text-[#2F80ED]"
                      onClick={() => handleReply(message)}
                    >
                      Reply
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
