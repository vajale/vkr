import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { mockTasks } from "@/utils/mock/mockdata";

import { type ICalendarSchema } from "@/store/slices/calendarSlice/types";
import { type Task } from "@/components/PageView/model/types";

const initialState: ICalendarSchema = {
    tasks: [],
    selectedTask: undefined
};

export const calendarTasksSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        updateTask: (state, action: PayloadAction<Task>) => {
            if (state.tasks.find(task => task.id === action.payload.id) == null) {
                state.tasks = [...state.tasks, action.payload];
                state.selectedTask = action.payload;
            } else {
                state.tasks.map(task => {
                    if (task.id === action.payload.id) {
                        const newTask = {
                            ...task,
                            ...action.payload
                        };
                        state.selectedTask = newTask;
                        return newTask;
                    }

                    return task;
                });
            }
        },
        updateTaskPriority: (state, action: PayloadAction<{ id: string, priority: string }>) => {
            state.tasks.map(task => {
                if (task.id === action.payload.id) {
                    task.priority = action.payload.priority;
                    return task;
                }

                return task;
            });
        },
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
        addTasks: (state, action: PayloadAction<Task>) => {
            state.tasks = [...state.tasks, action.payload];
        },
        removeTask: (state, action: PayloadAction<Task>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
        },
        selectTask: (state, action: PayloadAction<Task>) => {
            state.selectedTask = action.payload;
        }
    },
    selectors: {
        selectTasks: (state) => state.tasks,
        selectEditTask: (state) => state.tasks.find(task => state.selectedTask?.id === task.id),
    }
});

export const selectTaskById = (taskId: string) =>
    createSelector([selectTasks], tasks => tasks.find(task => task.id === taskId));

export const { selectTasks, selectEditTask } = calendarTasksSlice.selectors;
export default calendarTasksSlice.reducer;

export const { actions: calendarActions } = calendarTasksSlice;
export const { reducer: calendarReducer } = calendarTasksSlice;
