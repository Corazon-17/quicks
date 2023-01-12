import { Icon } from "@/components/utils";
import { getTruthyKeys } from "@/utils";
import { useState } from "react";

type StickerObj = { [key: string]: boolean };

export default function Stickers() {
  const stickerOpt: StickerObj = {
    "Important ASAP": true,
    "Offline Meeting": true,
    "Virtual Meeting": false,
    ASAP: false,
    "Client Related": false,
    "Self Task": false,
    Appointments: false,
    "Court Related": false,
  };

  const [value, setValue] = useState<StickerObj>(stickerOpt);
  const [toggleOpt, setToggleOpt] = useState<boolean>(false);
  const options = Object.keys(stickerOpt);
  const selected = getTruthyKeys(value);

  type ValueKey = keyof typeof value;
  const updateValue = (key: ValueKey) => {
    let newValue: typeof value = { ...value };
    newValue[key] = !newValue[key];

    setValue(newValue);
  };

  return (
    <div className="grid relative text-12 font-bold">
      <div
        className="grid grid-cols-[36px_1fr] items-start bg-blue-200 py-1 rounded"
        onClick={() => setToggleOpt(!toggleOpt)}
      >
        <div className="py-1">
          <Icon name="bookmark" width={18} />
        </div>

        <div className="flex flex-wrap gap-2 px-2">
          {selected.map((val, i) => (
            <div
              key={i}
              className="bg-red-400 px-2 py-1 rounded whitespace-nowrap"
            >
              {val}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`${
          toggleOpt ? "block" : "hidden"
        } absolute top-10 z-10 bg-white border border-black rounded-md w-max p-2`}
      >
        <div className="grid gap-3 w-48 ">
          {options.map((opt, i) => (
            <div
              key={i}
              className="px-2 py-1 border border-black rounded bg-red-400"
              onClick={() => updateValue(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
