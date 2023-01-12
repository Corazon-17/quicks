import { ComponentProps } from "@/types";
import { Icon } from "../utils";

export default function Layout({ children }: ComponentProps) {
  return (
    <div className="flex justify-between min-h-screen font-lato text-[#f2f2f2]">
      <aside className="block sticky top-0 w-[285px] bg-[#333333] border-r border-white"></aside>
      <main className="flex flex-col grow">
        <div className="flex sticky top-0 items-center px-8 h-[58px] bg-[#4f4f4f] z-10">
          <Icon name="search" width={16} height={16} />
        </div>

        <div className="flex flex-col flex-wrap relative h-full bg-[#333333]">
          {children}
        </div>
      </main>
    </div>
  );
}
