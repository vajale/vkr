import { type Task } from "@/components/PageView/model/types";

export interface ICalendarSchema {
    tasks: Task[],
    selectedTask?: Partial<Task>
}
