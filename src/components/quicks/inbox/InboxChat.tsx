import { Icon } from "@/components/utils";
import MessageCard from "./MessageCard";

export default function InboxChat() {
  return (
    <div className="flex flex-col text-black gap-2 absolute bottom-20 w-[480px] h-[480px] rounded-md bg-white">
      <div className="w-full sticky top-0 border-b border-black rounded-t-md bg-white z-10">
        <div className="flex gap-2 min-h-max py-4 px-4 items-center">
          <div className="pl-2 pr-1">
            <Icon name="arrow_left_black" width={16} />
          </div>
          <div className="flex flex-col flex-wrap overflow-hidden grow">
            <span className="text-14 font-bold text-blue-500 break-all leading-none">
              I-589 - AMARKHIL,adhjahdjahdjahdj Obadullah [Affirmative Filling
              with ZHN]
            </span>
            <span className="text-12 pt-1">3 Participants</span>
          </div>
          <div className="justify-end">
            <Icon name="close_black" width={16} />
          </div>
        </div>
      </div>

      <div className="grid gap-2 overflow-y-auto rounded-b-md pl-4 pr-1 pb-2">
        <MessageCard />
        <MessageCard />
        <MessageCard />
        <MessageCard />
      </div>

      <div className="flex justify-between gap-2 sticky bottom-0 px-4 pb-2">
        <div className="grid relative w-full">
          {/* <Reply /> */}
          <input
            placeholder="Type a new message"
            className="w-full border border-black rounded-b px-2 resize-none"
          />
        </div>

        <button className="h-8 px-2 py-1 rounded text-white bg-blue-500">
          Send
        </button>
      </div>

      <div className="grid absolute w-full px-4 left-0 bottom-11">
        {/* New Message */}
        {/* <span className="w-max cursor-pointer place-self-center text-14 px-2 py-1 text-blue-600 bg-blue-100 rounded-md">
          New Message
        </span> */}

        {/* Waiting message */}
        {/* <div className="flex gap-1 items-center bg-[#E9F3FF] px-2 py-1 rounded">
          <div className="animate-spin">
            <Icon name="spinner_blue" width={24} />
          </div>
          <span className="text-14">
            Please wait while we connect you with one of our team
          </span>
        </div> */}
      </div>
    </div>
  );
}

const Reply = () => {
  return (
    <div className="absolute bottom-8 w-full text-12 bg-blue-200 px-2 py-2 border border-black">
      <div className="grid grid-cols-[1fr_24px] w-full">
        <div>
          <span className="font-bold">Replying to Mary Hilda</span>
          <p className="leading-tight">
            Hello Obaidullah, I will be your case advisor for case #029290. I
            have assigned some homework for you to fill. Please keep up with the
            due dates. Should you have any questions, you can message me
            anytime. Thanks.
          </p>
        </div>
        <div className="self-start justify-self-end pr-1">
          <Icon name="close_black" width={12} />
        </div>
      </div>
    </div>
  );
};
