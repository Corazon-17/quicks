import { Icon } from "@/components/utils";
import { useUserStore } from "@/store";
import { TaskModel } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import TaskAccordion from "./TaskAccordion";

export default function TaskList() {
  const activeUserId = useUserStore((state) => state.id);

  const [allTask, setAllTask] = useState<{}[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toggleTask, setToggleTask] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      // url to get current activeUser task, order it by completed and date
      const url = `https://mockend.com/Corazon-17/quicks/tasks?userId_eq=${activeUserId}&completed_order=asc&createdAt_order=desc`;
      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          setIsLoading(false);
          setAllTask(data);
        })
        .catch((error) => console.log(error));
    };

    fetchData();
  }, []);

  return (
    <div className="block w-full h-full overflow-y-auto">
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

      {!isLoading && allTask && (
        <div className="overflow-y-auto divide-y divide-black pl-4 pr-2 min-h-[1fr]">
          {allTask.map((task) => (
            <TaskAccordion task={task as TaskModel} />
          ))}
        </div>
      )}
    </div>
  );
}
