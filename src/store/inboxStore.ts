import { InboxModel, MessageModel } from "@/types";
import { create } from "zustand";

interface Inbox {
  userId: number | null;
  inboxData: InboxModel[];
  setUserId: (newUserId: number) => void;
  setInboxData: (newTaskData: InboxModel[]) => void;
  addNewMessage: (newMessage: MessageModel, inboxId: number) => void;
}

export const useInboxStore = create<Inbox>((set, get) => ({
  userId: null,
  inboxData: [],
  setUserId: (newUserId: number) => set({ userId: newUserId }),
  setInboxData: (newInboxData: InboxModel[]) =>
    set({ inboxData: newInboxData }),
  addNewMessage: (newMessage: MessageModel, inboxId: number) => {
    const newData: InboxModel[] = get().inboxData.map((inbox) => {
      if (inbox.id === inboxId) {
        return { ...inbox, messages: [...inbox.messages, newMessage] };
      } else {
        return { ...inbox };
      }
    });
    console.log(newData)

    set({ inboxData: newData });
  },
}));
