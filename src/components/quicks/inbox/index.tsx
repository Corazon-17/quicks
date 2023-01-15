import { Icon } from "@/components/utils";
import { useQuickStore } from "@/store";
import { useEffect, useState } from "react";
import InboxList from "./InboxList";

export default function Inbox() {
  const expand = useQuickStore((state) => state.expand);
  const activeQuick = useQuickStore((state) => state.active);
  const setActiveQuick = useQuickStore((state) => state.setActive);

  const spanGap = 11.88 + 60;
  const contentGap = 13 + 68;
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (active) {
      setActiveQuick("Inbox");
    }
  }, [active]);

  useEffect(() => {
    if (activeQuick !== "Inbox") {
      setActive(false);
    }
  }, [activeQuick]);

  return (
    <div className="flex flex-col-reverse items-end">
      {active && activeQuick === "Inbox" ? (
        <div className="flex relative w-max justify-end">
          <div
            className="absolute right-[15px] w-[68px] h-[68px] rounded-full bg-[#4f4f4f]"
            onClick={() => setActiveQuick(null)}
          ></div>
          <div className="z-10">
            <Icon
              name="inbox"
              width={25.19}
              height={25.19}
              bgWidth={68}
              bgHeight={68}
              bgColor="#8785FF"
              bgRounded
            />
          </div>
        </div>
      ) : (
        <div onClick={() => setActive(true)}>
          <Icon
            name="inbox_purple"
            width={24.24}
            bgWidth={60}
            bgHeight={60}
            bgColor="#f2f2f2"
            bgRounded
          />
        </div>
      )}

      {expand && !activeQuick && (
        <span
          className="absolute w-full text-center"
          style={{ bottom: spanGap }}
        >
          Inbox
        </span>
      )}

      {active && activeQuick === "Inbox" && (
        <div
          className="flex flex-col absolute w-[560px] h-[480px] fhd:w-[734px] fhd:h-[737px] rounded-md bg-white text-[#4f4f4f] text-14 z-20"
          style={{ bottom: contentGap }}
        >
          <InboxList />
        </div>
      )}
    </div>
  );
}
