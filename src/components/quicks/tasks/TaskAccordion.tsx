import { Icon } from "@/components/utils";
import { Sticker, TaskModel } from "@/types";
import { countDaysLeft } from "@/utils";
import { useRef, useState } from "react";
import Stickers from "./Stickers";

interface TaskAccordionProps {
  task: TaskModel;
}

export default function TaskAccordion({ task }: TaskAccordionProps) {
  const [collapse, setCollapse] = useState<boolean>(
    task.completed ? false : true
  );
  const [toggleOpt, setToggleOpt] = useState<boolean>(false);
  const [editTaskDetail, setEditTaskDetail] = useState<boolean>(false);

  const taskDetailRef = useRef<HTMLDivElement>(null);
  const deadline = task.deadline.slice(0, 10);
  const daysLeft = countDaysLeft(deadline);

  return (
    <div className="grid gap-2 py-4 ">
      <div className="grid grid-cols-[65%_35%]">
        <div className="grid grid-cols-[24px_1fr] gap-1 items-start">
          <Icon
            name={`${task.completed ? "square_checked" : "square"}`}
            width={24}
          />
          <span className={`font-bold ${task.completed && "line-through"}`}>
            {task.title}
          </span>
        </div>
        <div className="h-max justify-self-end">
          <div className="flex items-center gap-2 text-12">
            <span className="text-red-400">{daysLeft} Days Left</span>
            <span>{deadline}</span>
            <button onClick={() => setCollapse(!collapse)}>
              <Icon name="arrow_down_black" width={10} />
            </button>
            <div className="grid relative">
              <button onClick={() => setToggleOpt(!toggleOpt)}>
                <Icon name="other" width={14} />
              </button>
              {toggleOpt && (
                <button className="absolute right-0 top-4 w-20 text-start bg-white border border-black rounded text-red-500 px-3 py-1">
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {collapse && (
        <div className="grid px-4 gap-2">
          <div className="grid grid-cols-[20px_1fr] pl-2 w-max relative gap-4 items-center">
            <Icon name="clock" width={18} />
            {/* <div className="flex justify-between w-36 px-2 py-1 border border-black rounded">
            <span>12/06/2021</span>
            <Icon name="calendar" />
          </div> */}
            <input
              type="date"
              value={deadline}
              onChange={() => {}}
              className="border border-black rounded px-2 py-1"
            />
          </div>

          {/* To get the value: taskDetailRef.current?.innerHTML */}
          <div className="grid grid-cols-[20px_1fr] pl-2 gap-4 items-start">
            <button onClick={() => taskDetailRef.current?.focus()}>
              <Icon name="pencil" width={16} />
            </button>
            <div
              ref={taskDetailRef}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onFocus={() => setEditTaskDetail(true)}
              onBlur={() => setEditTaskDetail(false)}
              className={`leading-4 ${editTaskDetail && "px-2 py-1"}`}
            >
              {task.description}
            </div>
          </div>

          <Stickers stickerIds={task.stickerIds} />
        </div>
      )}{" "}
    </div>
  );
}
