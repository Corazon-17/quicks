import { Icon } from "@/components/utils";
import { useState } from "react";
import InboxChat from "./InboxChat";
import InboxList from "./InboxList";
import MessageCard from "./MessageCard";

export default function Inbox() {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className="flex flex-col-reverse items-end">
      {!active ? (
        <div onClick={() => setActive(true)}>
          <Icon
            name="inbox_purple"
            width={24.24}
            bgWidth={60}
            bgHeight={60}
            bgColor="#fff"
            bgRounded
          />
        </div>
      ) : (
        <div className="flex relative w-32 justify-end">
          <div
            className="absolute right-3 w-[68px] h-[68px] rounded-full bg-gray-400"
            onClick={() => setActive(false)}
          ></div>
          <div className="z-10">
            <Icon
              name="inbox_purple"
              width={32}
              bgWidth={68}
              bgHeight={68}
              bgColor="#fff"
              bgRounded
            />
          </div>
        </div>
      )}

      {!active ? (
        <span className="absolute bottom-16 w-full text-center">Inbox</span>
      ) : (
        <div className="flex flex-col z-20 gap-2 absolute bottom-20 w-[480px] h-[480px] rounded-md bg-white">
          <div className="w-full px-4 pt-3 pb-1">
            <div className="flex sticky top-0 bg-white justify-between w-full h-max px-8 border border-black rounded-md">
              <input placeholder="search" className="text-black outline-none" />
              <Icon name="search_black" width={16} />
            </div>
          </div>
          <div className="grid w-full h-full px-4 mb-4 overflow-y-auto">
            <InboxList />

            {/* <div className="grid place-self-center">
            <div className="animate-spin">
              <Icon name="spinner" />
            </div>
            <span className="text-black content-center">Loading Chats...</span>
          </div> */}
          </div>
        </div>
      )}

      {/* <InboxChat /> */}
    </div>
  );
}
