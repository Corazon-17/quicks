import { Icon } from "@/components/utils";
import { useUserStore } from "@/store";
import { InboxModel, MessageModel } from "@/types";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import InboxCard from "./InboxCard";
import InboxChat from "./InboxChat";

export default function InboxList() {
  const activeUserId = useUserStore((state) => state.id);

  const [allInbox, setAllInbox] = useState<InboxModel[] | null>(null);
  const [chatComponent, setChatComponent] = useState<ReactNode>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShowChat, setIsShowChat] = useState<boolean>(false);

  const handleInboxClick = (idx: number) => {
    setChatComponent(
      <InboxChat
        inbox={allInbox![idx]}
        setShowChat={setIsShowChat}
      />
    );
    setIsShowChat(true);
  };

  useEffect(() => {
    if (!isShowChat) {
      setChatComponent(null);
    }
  }, [isShowChat]);

  useEffect(() => {
    const fetchData = async () => {
      const inboxUrl = `https://mockend.com/Corazon-17/quicks/inboxs?userId_eq=${activeUserId}`;

      await axios
        .get(inboxUrl)
        .then(async (response) => {
          const inbox: InboxModel[] = response.data;

          const userUrl = `https://mockend.com/Corazon-17/quicks/users`;

          await axios.get(userUrl).then(async (response) => {
            const users = response.data;

            const messageUrls: string[] = [];
            const inboxIds = inbox.map((inbox) => inbox.id);
            inboxIds.forEach((id) => {
              messageUrls.push(
                `https://mockend.com/Corazon-17/quicks/messages?inboxId_eq=${id}&createdAt_order=asc`
              );
            });

            var inboxTemp: InboxModel[] = [...inbox];
            const requests = messageUrls.map(async (url) => axios.get(url));
            await axios
              .all(requests)
              .then((responses) => {
                responses.forEach((resp, i) => {
                  const messages: MessageModel[] = [];
                  resp.data.forEach((message: MessageModel) => {
                    const sender = users.filter(
                      (user: any) => user.id === message.senderId
                    )[0];

                    messages.push({ ...message, senderName: sender.name });
                  });

                  inboxTemp[i] = { ...inboxTemp[i], messages: messages };
                });
              })
              .catch((error) => console.log(error));

            setAllInbox(inboxTemp);
            setIsLoading(false);
          });
        })
        .catch((error) => console.log(error));
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      {!isShowChat && (
        <div className="w-full px-4 pt-3 pb-1">
          <div className="flex sticky top-0 bg-white justify-between w-full h-max px-8 border border-black rounded-md">
            <input placeholder="search" className="text-black outline-none" />
            <Icon name="search_black" width={16} />
          </div>
        </div>
      )}

      {isLoading && (
        <div className="flex absolute top-0 h-full w-full items-center justify-center text-black">
          <div className="grid">
            <div className="w-max animate-spin">
              <Icon name="spinner" />
            </div>
            <span>Loading Inbox...</span>
          </div>
        </div>
      )}

      {!isLoading && allInbox && (
        <div className="flex flex-col w-full h-full px-4 overflow-y-auto">
          <div className="grid grid-cols-1 divide-y divide-gray-400">
            {allInbox.map((inbox, i) => (
              <div key={i} onClick={() => handleInboxClick(i)}>
                <InboxCard inbox={inbox} />
              </div>
            ))}
          </div>
        </div>
      )}

      {chatComponent}
    </div>
  );
}
