import { useQuickStore } from "@/store";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Icon } from "../utils";
import Inbox from "./inbox";
import Tasks from "./tasks";

type Offset = { [key: string]: number };

export default function Quicks() {
  const expand = useQuickStore((state) => state.expand);
  const activeQuick = useQuickStore((state) => state.active);
  const setExpand = useQuickStore((state) => state.setExpand);

  const bigWidth = 68
  const smallWidth = 60
  const defaultOffset = {
    Inbox: bigWidth + 26,
    Tasks: bigWidth + smallWidth + (26 * 2),
  };
  const [offset, setOffset] = useState<Offset>(defaultOffset);
  type OffsetKey = keyof typeof offset;

  useEffect(() => {
    if (activeQuick) {
      let newOffset = { ...offset };
      newOffset[activeQuick as OffsetKey] = 0;

      const otherKeys = Object.keys(newOffset).filter(
        (key) => key !== activeQuick
      );
      otherKeys.forEach((key, i) => {
        newOffset[key] = bigWidth + (smallWidth * i) + ((i + 1) * 31);
      });

      setOffset(newOffset);
    } else {
      setOffset(defaultOffset);
      setExpand(false);
    }
  }, [activeQuick]);

  return (
    <div className="flex flex-row-reverse w-full justify-start gap-6 items-center absolute bottom-[27px] right-[34px]">
      <button
        className={`${activeQuick ? "opacity-0 z-0" : "opacity-100 z-10"} transition-all duration-500`}
        onClick={() => setExpand(!expand)}
      >
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
        className={`absolute transition-all duration-500`}
        style={{ right: expand ? offset["Tasks"] : 0 }}
      >
        <Tasks />
      </div>
      <div
        className={`absolute transition-all duration-500`}
        style={{ right: expand ? offset["Inbox"] : 0 }}
      >
        <Inbox />
      </div>
    </div>
  );
}
