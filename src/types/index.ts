export interface ComponentProps {
  classname?: string;
  children?: React.ReactNode;
}

export interface TaskModel {
  id: number;
  userId: number;
  title: string;
  description: string;
  createdAt: string;
  completed: boolean;
}
