import { Icon } from "@/components/utils";
import { useUserStore } from "@/store";
import { InboxModel } from "@/types";
import { extractDate, extractTime } from "@/utils";

interface InboxCardProps {
  inbox: InboxModel;
}

export default function InboxCard({ inbox }: InboxCardProps) {
  const activeUserId = useUserStore((state) => state.id);
  const lastMessage = inbox.messages.at(-1);
  const lastMessageDate = lastMessage?.createdAt;

  const lmDate = extractDate(lastMessageDate);
  const lmTime = extractTime(lastMessageDate);
  const lmSender =
    activeUserId === lastMessage?.senderId ? "You" : lastMessage?.senderName;
  const lmBody = lastMessage?.body;

  return (
    <div className="flex flex-row text-black gap-1 pt-4 pb-6 cursor-pointer">
      <div className="block relative mr-14">
        <div className="absolute">
          <Icon
            name="person_black"
            width={18}
            bgWidth={32}
            bgHeight={32}
            bgColor="gray"
            bgRounded
          />
        </div>
        <div className="absolute left-4">
          <Icon
            name="person"
            width={18}
            bgWidth={32}
            bgHeight={32}
            bgColor="blue"
            bgRounded
          />
        </div>
      </div>
      <div className="flex flex-col grow">
        <div className="flex gap-4 justify-start mb-1">
          <span className="text-16 font-bold text-blue-500 break-all leading-none">
            {inbox.name}
          </span>
          <span className="text-14 font-bold whitespace-nowrap">
            {lastMessage ? `${lmDate} ${lmTime}` : ""}
          </span>
        </div>
        <span className="text-14 font-bold break-all leading-none mb-1">
          {lmSender}
        </span>
        <span className="text-14 break-all leading-none">{lmBody ? lmBody : "No message"}</span>
      </div>
      <div className="self-end bg-red-600 w-2 h-2 rounded-full"></div>
    </div>
  );
}
