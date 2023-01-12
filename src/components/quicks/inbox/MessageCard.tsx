import { Icon } from "@/components/utils";
import { useState } from "react";

interface MessageCardProps {
  
}

export default function MessageCard() {
  const [toggleOpt, setToggleOpt] = useState<boolean>(false);
  return (
    <div className="flex flex-nowrap">
      <div className="grid">
        {/* add text-end */}
        <span className="w-full text-purple-400">Bambang</span>
        {/* add flex-row-reverse */}
        <div className="flex items-start gap-1">
          <div className="grid gap-1 w-full text-14 border p-2 rounded-md bg-purple-400">
            <p>
              Hello Obaidullah, I will be your case advisor for case #029290. I
              have assigned some homework for you to fill. Please keep up with
              the due dates. Should you have any questions, you can message me
              anytime. Thanks.
            </p>
            <span>19:32</span>
          </div>
          <div className="grid relative">
            <button onClick={() => setToggleOpt(!toggleOpt)}>
              <Icon name="other" width={16} />
            </button>

            {toggleOpt && (
              // change right-0 to left-0
              <div className="grid absolute w-24 right-0 top-4 bg-white border divide-y divide-black rounded">
                <span className="px-2 py-1 text-blue-400">Edit</span>
                <span className="px-2 py-1 text-red-400">Delete</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
