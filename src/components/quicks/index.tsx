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

  const defaultOffset = {
    Inbox: 85,
    Tasks: 170,
  };
  const [offset, setOffset] = useState<Offset>(defaultOffset);
  type OffsetKey = keyof typeof offset;

  useEffect(() => {
    if (activeQuick) {
      let newOffset = { ...offset };
      newOffset[activeQuick as OffsetKey] = 1;

      const otherKeys = Object.keys(newOffset).filter(
        (key) => key !== activeQuick
      );
      otherKeys.forEach((key, i) => {
        newOffset[key] = (i + 1) * 85;
      });

      setOffset(newOffset);
    } else {
      setOffset(defaultOffset);
      setExpand(false);
    }
  }, [activeQuick]);

  return (
    <div className="flex flex-row-reverse gap-6 items-center justify-center absolute bottom-8 right-8">
      <button
        className={`${activeQuick ? "opacity-0 z-0" : "z-10"}`}
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
        className={`absolute transition-all duration-700`}
        style={{ right: expand ? offset["Tasks"] : 1 }}
      >
        <Tasks />
      </div>
      <div
        className={`absolute transition-all duration-700`}
        style={{ right: expand ? offset["Inbox"] : 1 }}
      >
        <Inbox />
      </div>
    </div>
  );
}
