import { Icon } from "@/components/utils";
import { Sticker } from "@/types";
import { getTruthyKeys } from "@/utils";
import { useState } from "react";

type StickerObj = { [key: string]: boolean };

interface StickersProps {
  stickerIds: number[];
}

const stickers: Sticker[] = [
  "Important ASAP",
  "Offline Meeting",
  "Virtual Meeting",
  "ASAP",
  "Client Related",
  "Self Task",
  "Appointments",
  "Court Related",
];

const stickerColors = Object.fromEntries(
  [
    "#E5F1FF",
    "#FDCFA4",
    "#F9E9C3",
    "#AFEBDB",
    "#CBF1C2",
    "#CFCEF9",
    "#F9E0FD",
    "#9DD0ED",
  ].map((color, i) => [stickers[i], color])
);

const initStickerObj = (stickerIds: number[]): StickerObj => {
  return Object.fromEntries(
    stickers.map((key, i) => [
      key,
      stickerIds.length > 0 ? stickerIds.includes(i) : false,
    ])
  );
};

export default function Stickers({ stickerIds }: StickersProps) {
  const stickerOpt: StickerObj = initStickerObj(stickerIds);

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
    <div className="grid relative text-12 font-bold ">
      <div
        className="grid grid-cols-[36px_1fr] items-start bg-[#f9f9f9] py-1 rounded"
        onClick={() => setToggleOpt(!toggleOpt)}
      >
        <div className="py-1 fhd:pt-[14.83px] fhd:pb-[15.83px]">
          <Icon
            name={selected.length > 0 ? "bookmark_blue" : "bookmark"}
            width={16}
          />
        </div>

        <div className="flex flex-wrap gap-2 px-2">
          {selected.map((val, i) => (
            <div
              key={i}
              className="px-2 py-1 fhd:px-[12px] fhd:py-[8px] rounded whitespace-nowrap"
              style={{ backgroundColor: stickerColors[val] }}
            >
              {val}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`${
          toggleOpt ? "block" : "hidden"
        } absolute top-10 left-3 z-10 bg-[#f9f9f9] border border-[#828282] rounded-md w-max p-2`}
      >
        <div className="grid gap-3 w-48 ">
          {options.map((opt, i) => (
            <div
              key={i}
              className={`px-2 py-1 rounded ${
                selected.includes(opt) && "border border-[#2F80ED]"
              }`}
              style={{ backgroundColor: stickerColors[opt] }}
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
