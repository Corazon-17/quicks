import { Icon } from "@/components/utils";
import { useUserStore } from "@/store";
import { MessageModel, ValueSetter } from "@/types";
import { extractTime } from "@/utils";
import { useState } from "react";

interface MessageCardProps {
  message: MessageModel;
  handleReply: (message: MessageModel) => void;
}

export default function MessageCard({
  message,
  handleReply,
}: MessageCardProps) {
  const activeUserId = useUserStore((state) => state.id);

  const yourself = activeUserId === message.senderId;
  const time = extractTime(message.createdAt);
  const [toggleOpt, setToggleOpt] = useState<boolean>(false);

  return (
    <div className="flex flex-nowrap">
      <div className="flex flex-col w-full">
        <span className={`w-full text-purple-400 ${yourself && "text-end"}`}>
          {yourself ? "You" : message.senderName}
        </span>
        <div
          className={`flex ${
            yourself && "flex-row-reverse self-end"
          } items-start gap-1 w-80`}
        >
          <div className="grid gap-1 w-full text-14 border p-2 rounded-md bg-purple-400">
            <p>{message.body}</p>
            <span>{time}</span>
          </div>
          <div className="grid relative">
            <button onClick={() => setToggleOpt(!toggleOpt)}>
              <Icon name="other" width={16} />
            </button>

            {toggleOpt && (
              <div
                className={`grid absolute w-24 cursor-pointer ${
                  yourself ? "left-0" : "right-0"
                } top-4 bg-white border divide-y divide-black rounded`}
              >
                {yourself ? (
                  <>
                    <span className="px-2 py-1 text-blue-400">Edit</span>
                    <span className="px-2 py-1 text-red-400">Delete</span>
                  </>
                ) : (
                  <>
                    <span
                      className="px-2 py-1 text-blue-400"
                      onClick={() => handleReply(message)}
                    >
                      Reply
                    </span>
                    <span className="px-2 py-1 text-red-400">Share</span>
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
