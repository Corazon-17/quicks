import { Icon } from "@/components/utils";
import { useQuickStore } from "@/store";
import { useEffect, useState } from "react";
import TaskList from "./TaskList";

export default function Tasks() {
  const expand = useQuickStore((state) => state.expand);
  const activeQuick = useQuickStore((state) => state.active);
  const setActiveQuick = useQuickStore((state) => state.setActive);

  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (active) {
      setActiveQuick("Tasks");
    } else {
      setActiveQuick(null);
    }
  }, [active]);

  return (
    <div className="flex flex-col-reverse items-end">
      {!active ? (
        <div onClick={() => setActive(true)}>
          <Icon
            name="task_orange"
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
              name="task_orange"
              width={32}
              bgWidth={68}
              bgHeight={68}
              bgColor="#fff"
              bgRounded
            />
          </div>
        </div>
      )}

      {expand && !activeQuick && (
        <span className="absolute bottom-16 w-full text-center">Tasks</span>
      )}

      {active && (
        <div className="flex flex-col z-20 gap-2 absolute bottom-20 w-[540px] h-[480px] rounded-md bg-white text-black text-14">
          <TaskList />
        </div>
      )}
    </div>
  );
}
