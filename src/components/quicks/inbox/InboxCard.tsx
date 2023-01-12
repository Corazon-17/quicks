import { Icon } from "@/components/utils";

export default function InboxCard() {
  return (
    <div className="flex flex-row text-black gap-1 pt-4 pb-6 cursor-pointer">
      <div className="block relative mr-14">
        <div className="absolute">
          <Icon
            name="person_black"
            width={18}
            bgWidth={32}
            bgHeight={32}
            bgColor="gray"
            bgRounded
          />
        </div>
        <div className="absolute left-4">
          <Icon
            name="person"
            width={18}
            bgWidth={32}
            bgHeight={32}
            bgColor="blue"
            bgRounded
          />
        </div>
      </div>
      <div className="flex flex-col grow">
        <div className="flex gap-4 justify-start mb-1">
          <span className="text-16 font-bold text-blue-500 break-all leading-none">
            109220-Naturalization
          </span>
          <span className="text-14 font-bold whitespace-nowrap">
            02/06/2021 10:45
          </span>
        </div>
        <span className="text-14 font-bold break-all leading-none mb-1">
          Cameron Philips :
        </span>
        <span className="text-14 break-all leading-none">
          Please check this out
        </span>
      </div>
      <div className="self-end bg-red-600 w-2 h-2 rounded-full"></div>
    </div>
  );
}
