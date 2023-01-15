import { DatePicker, Icon } from "@/components/utils";
import { Sticker, TaskModel } from "@/types";
import { countDaysLeft, extractDate } from "@/utils";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
  const [editTaskTitle, setEditTaskTitle] = useState<boolean>(false);
  const [deadline, setDeadline] = useState<string>(
    extractDate(task.deadline, true) as string
  );
  const [daysLeft, setDaysLeft] = useState<number>(countDaysLeft(task.deadline))

  const taskDetailRef = useRef<HTMLDivElement>(null);
  const taskTitleRef = useRef<HTMLDivElement>(null);

  const handleDeadlineChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue.split("/").length === 3) {
      const [date, month, year] = newValue.split("/");

      if (
        !Number.isNaN(Number(date)) &&
        !Number.isNaN(Number(month)) &&
        !Number.isNaN(Number(year))
      ) {
        if (
          Number(date) > 0 &&
          Number(date) < 32 &&
          Number(month) > 0 &&
          Number(month) < 13
        ) {
          const newDeadline = `${
            Number(date) < 10 ? `0${Number(date)}` : date
          }/${Number(month) < 10 ? `0${Number(month)}` : month}/${year}`;
          setDeadline(newDeadline);
        }
      }
    }
  };

  useEffect(() => {
    setDaysLeft(countDaysLeft(deadline))
  }, [deadline])

  return (
    <div className="grid gap-2 mb-[22px] ">
      <div className="grid grid-cols-[65%_35%] items-start">
        <div className="grid grid-cols-[24px_1fr] gap-1 ">
          <div className="pt-[2px]">
            <Icon
              name={`${task.completed ? "square_checked" : "square"}`}
              width={18}
            />
          </div>
          <div
            ref={taskTitleRef}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onFocus={() => setEditTaskTitle(true)}
            onBlur={() => setEditTaskTitle(false)}
            className={`pt-[2px] font-bold break-all leading-4 outline-none rounded ${
              editTaskTitle && "px-2 py-1 border border-[#E0E0E0]"
            } ${task.completed && "line-through"}`}
          >
            {task.title ? task.title : ""}
          </div>
        </div>
        <div className="h-max justify-self-end items-center pt-[2.5px]">
          <div className="flex items-center gap-2 text-12">
            <span className="text-[#EB5757] whitespace-nowrap">
              {task.completed ? "" : `${daysLeft} Days Left`}
            </span>
            <span>{deadline}</span>
            <button onClick={() => setCollapse(!collapse)}>
              <Icon
                name={collapse ? "arrow_up_black" : "arrow_down_black"}
                width={10}
              />
            </button>
            <div className="grid relative">
              <button onClick={() => setToggleOpt(!toggleOpt)}>
                <Icon name="other" width={14} />
              </button>
              {toggleOpt && (
                <button className="absolute right-0 top-4 w-20 text-start bg-white border border-[#828282] rounded text-[#EB5757] px-3 py-1">
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
            <div className="flex justify-between items-center w-36 px-2 py-1 border border-black rounded">
              <input
                className="w-24 outline-none"
                value={deadline}
                onChange={(e) => handleDeadlineChange(e)}
              />
              <DatePicker value={deadline} setValue={setDeadline} />
            </div>
          </div>

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
              className={`break-all leading-4 outline-none rounded ${
                editTaskDetail && "px-2 py-1 border border-[#E0E0E0]"
              }`}
            >
              {task.description ? task.description : "No Description"}
            </div>
          </div>

          <Stickers stickerIds={task.stickerIds} />
        </div>
      )}
    </div>
  );
}
