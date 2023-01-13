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
  stickers: Array<Sticker> | [];
  deadline: string;
  completed: boolean;
}
