import { useState } from "react";
import { Icon } from "../utils";
import Inbox from "./inbox";
import Tasks from "./tasks";

export default function Quicks() {
  const [expand, setExpand] = useState<boolean>(true);
  const [activeQuick, setActiveQuick] = useState<string | null>(null);

  return (
    <div className="flex flex-row-reverse gap-6 items-center justify-center absolute bottom-8 right-8">
      <button className="z-10" onClick={() => setExpand(!expand)}>
        <Icon
          name="thunder"
          width={18}
          bgWidth={68}
          bgHeight={68}
          bgColor="#2F80ED"
          bgRounded
        />
      </button>
      <div
        className={`absolute ${
          expand ? "right-[85px]" : "right-0"
        } transition-all duration-700`}
      >
        <Tasks />
      </div>
      <div
        className={`absolute ${
          expand ? "right-[165px]" : "right-0"
        } transition-all duration-700`}
      >
        <Inbox />
      </div>
    </div>
  );
}
