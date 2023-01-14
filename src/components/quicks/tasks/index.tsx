import { Icon } from "@/components/utils";
import { useQuickStore } from "@/store";
import { useEffect, useState } from "react";
import TaskList from "./TaskList";

export default function Tasks() {
  const expand = useQuickStore((state) => state.expand);
  const activeQuick = useQuickStore((state) => state.active);
  const setActiveQuick = useQuickStore((state) => state.setActive);

  const spanGap = 11.88 + 60;
  const contentGap = 13 + 68;
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (active) {
      setActiveQuick("Tasks");
    }
  }, [active]);

  useEffect(() => {
    if (activeQuick !== "Tasks") {
      setActive(false);
    }
  }, [activeQuick]);

  return (
    <div className="flex flex-col-reverse items-end">
      {active && activeQuick === "Tasks" ? (
        <div className="flex relative w-max justify-end">
          <div
            className="absolute right-[15px] w-[68px] h-[68px] rounded-full bg-[#4f4f4f]"
            onClick={() => setActiveQuick(null)}
          ></div>
          <div className="z-10">
            <Icon
              name="task"
              width={24.44}
              height={18.89}
              bgWidth={68}
              bgHeight={68}
              bgColor="#F8B76B"
              bgRounded
            />
          </div>
        </div>
      ) : (
        <div onClick={() => setActive(true)}>
          <Icon
            name="task_orange"
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
          Tasks
        </span>
      )}

      {active && activeQuick === "Tasks" && (
        <div
          className="flex flex-col absolute w-[560px] h-[480px] fhd:w-[734px] fhd:h-[737px] rounded-md bg-white text-[#4f4f4f] text-14"
          style={{ bottom: contentGap }}
        >
          <TaskList />
        </div>
      )}
    </div>
  );
}
