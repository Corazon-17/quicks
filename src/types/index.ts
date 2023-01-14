import { Dispatch } from "react";

export type ValueSetter<Type> = Dispatch<React.SetStateAction<Type>>;

export interface ComponentProps {
  classname?: string;
  children?: React.ReactNode;
}

export type Sticker =
  | "Important ASAP"
  | "Offline Meeting"
  | "Virtual Meeting"
  | "ASAP"
  | "Client Related"
  | "Self Task"
  | "Appointments"
  | "Court Related";

export interface TaskModel {
  id: number;
  userId: number;
  title: string;
  description: string;
  stickerIds: number[];
  deadline: string;
  completed: boolean;
}

export interface MessageModel {
  id: number;
  inboxId: number;
  senderId: number;
  senderName?: string;
  createdAt: string;
  body: string;
}

export interface InboxModel {
  id: number;
  userId: number;
  name: string;
  messages: MessageModel[];
}
