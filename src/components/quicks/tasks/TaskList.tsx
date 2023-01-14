import { Icon } from "@/components/utils";
import { useTaskStore, useUserStore } from "@/store";
import { Sticker, TaskModel } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import TaskAccordion from "./TaskAccordion";

export default function TaskList() {
  const activeUserId = useUserStore((state) => state.id);
  const taskUserId = useTaskStore((state) => state.userId);
  const taskDataState: TaskModel[] = useTaskStore((state) => state.taskData);
  const setTaskUserId = useTaskStore((state) => state.setUserId);
  const setTaskDataState = useTaskStore((state) => state.setTaskData);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toggleTask, setToggleTask] = useState<boolean>(false);

  // const addBlankTask = () => {
  //   const date = new Date();
  //   const blankTask: TaskModel = {
  //     id: taskDataState.length + 1,
  //     userId: taskDataId as number,
  //     title: "",
  //     description: "",
  //     stickerIds: [],
  //     deadline: date.toJSON().slice(0, 10),
  //     completed: false,
  //   };
  //   const newTaskData: TaskModel[] = [
  //     blankTask,
  //     ...(taskDataState as TaskModel[]),
  //   ];

  //   setTaskDataState(newTaskData);
  // };

  useEffect(() => {
    const fetchTaskData = async () => {
      // url to get current activeUser task, order it by completed and date
      const url = `https://mockend.com/Corazon-17/quicks/tasks?userId_eq=${activeUserId}&completed_order=asc&deadline_order=desc`;
      await axios
        .get(url)
        .then(async (response) => {
          const data = response.data;
          const tasks: TaskModel[] = data.map((task: TaskModel) => {
            return { ...task, stickerIds: [task.stickerIds] };
          });

          setTaskUserId(activeUserId as number);
          setTaskDataState(tasks);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    };

    // only fetch data when taskDataState is null or activeUser change
    if (!taskDataState || activeUserId !== taskUserId) {
      fetchTaskData();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="sticky top-0 py-[10px] fhd:pt-[19px] fhd:pb-[10px] bg-white z-10 rounded-md">
        <div className="flex justify-between px-4">
          <div className="grid relative place-items-center w-64">
            <button
              className="flex w-max items-center gap-2 bg-white border border-black rounded px-2.5 py-1 "
              onClick={() => setToggleTask(!toggleTask)}
            >
              <span className="font-bold">My Tasks</span>
              <Icon name="arrow_down_black" width={12} />
            </button>
            {toggleTask && (
              <div className="absolute top-8">
                <div className="grid w-[246px] mt-2 bg-white border border-[#828282] rounded divide-y divide-black">
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
          <button
            // onClick={() => addBlankTask()}
            className="h-max bg-blue-500 rounded px-3 py-1.5 text-white"
          >
            New Task
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="flex absolute top-0 h-full w-full items-center justify-center">
          <div className="grid">
            <div className="w-max animate-spin">
              <Icon name="spinner" />
            </div>
            <span>Loading Tasks...</span>
          </div>
        </div>
      )}

      {!isLoading && taskDataState && (
        <div className="overflow-y-auto divide-y divide-black pl-4 pr-2 min-h-[1fr]">
          {taskDataState.map((task, i) => (
            <TaskAccordion key={i} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
