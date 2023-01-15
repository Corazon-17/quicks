import { Icon } from "@/components/utils";
import { useUserStore } from "@/store";
import { InboxModel } from "@/types";
import { extractDate, extractTime } from "@/utils";

interface InboxCardProps {
  inbox: InboxModel;
  isNewMessage?: boolean;
  fastVisaSupport?: boolean;
}

export default function InboxCard({
  inbox,
  isNewMessage,
  fastVisaSupport,
}: InboxCardProps) {
  const activeUserId = useUserStore((state) => state.id);
  const lastMessage = inbox.messages.at(-1);
  const lastMessageDate = lastMessage?.createdAt;

  const lmDate = extractDate(lastMessageDate, true);
  const lmTime = extractTime(lastMessageDate);
  const lmSender =
    activeUserId === lastMessage?.senderId ? "You" : lastMessage?.senderName;
  const lmBody = lastMessage?.body;

  return (
    <div className="grid grid-cols-[51px_1fr_10px] gap-[17px] text-black pb-[22px] cursor-pointer">
      {!fastVisaSupport ? (
        <div className="block relative">
          <div className="absolute">
            <Icon
              name="person_black"
              width={12}
              bgWidth={34}
              bgHeight={34}
              bgColor="#E0E0E0"
              bgRounded
            />
          </div>
          <div className="absolute left-[17px]">
            <Icon
              name="person"
              width={12}
              bgWidth={34}
              bgHeight={34}
              bgColor="#2F80ED"
              bgRounded
            />
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-center">
          <Icon
            name="letter_f"
            width={7.34}
            bgWidth={34}
            bgHeight={34}
            bgColor="#2F80ED"
            bgRounded
          />
        </div>
      )}

      <div className="flex flex-col grow">
        <div className="flex gap-[16px] justify-start mb-1">
          <span className="text-16 font-bold text-[#2F80ED] break-all leading-none pt-[1.5px]">
            {inbox.name}
          </span>
          <span className="whitespace-nowrap">
            {lastMessage ? `${lmDate} ${lmTime}` : ""}
          </span>
        </div>
        <span className="font-bold break-all leading-none mb-1">
          {lmSender}
        </span>
        <span className="break-all leading-none">
          {lmBody ? lmBody : "No message"}
        </span>
      </div>
      {isNewMessage && (
        <div className="self-end bg-red-600 w-[10px] h-[10px] rounded-full"></div>
      )}
    </div>
  );
}
