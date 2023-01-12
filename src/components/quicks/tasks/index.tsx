import { Icon } from "@/components/utils";
import { useState } from "react";
import TaskAccordion from "./TaskAccordion";

export default function Tasks() {
  const [toggleTask, setToggleTask] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

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

      {!active ? (
        <span className="absolute bottom-16 w-full text-center">Inbox</span>
      ) : (
        <div className="flex flex-col z-20 gap-2 absolute bottom-20 w-[540px] h-[480px] rounded-md bg-white text-black text-14">
          <div className="flex justify-between mt-2 px-4">
            <div className="grid relative place-items-center w-64">
              <button
                className="flex w-max items-center gap-2 bg-white border border-black rounded px-2 py-1 "
                onClick={() => setToggleTask(!toggleTask)}
              >
                <span className="font-bold">My Tasks</span>
                <Icon name="arrow_down_black" width={12} />
              </button>
              {toggleTask && (
                <div className="absolute top-8">
                  <div className="grid w-56 mt-2 bg-white border border-black rounded divide-y divide-black">
                    <button className="text-start font-bold px-2 py-1">
                      Personal Errands
                    </button>
                    <button className="text-start font-bold px-2 py-1">
                      Urgent To-Do
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button className="h-max bg-blue-500 rounded px-2 py-1 text-white">
              New Task
            </button>
          </div>

          {/* <div className="flex items-center justify-center w-full h-full">
          <div className="grid">
            <div className="w-max animate-spin">
              <Icon name="spinner" />
            </div>
            <span>Loading Tasks...</span>
          </div>
        </div> */}

          <div className="overflow-y-auto divide-y divide-black pl-4 pr-2 min-h-[1fr]">
            <TaskAccordion />
            <TaskAccordion />
            <TaskAccordion />
            <TaskAccordion />
          </div>
        </div>
      )}
    </div>
  );
}
