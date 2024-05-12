import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type ICalendarSchema } from "@/store/slices/calendarSlice/types";
import { type Task } from "@/components/PageView/model/types";

const initialState: ICalendarSchema = {
    tasks: [],
    selectedTask: undefined
};

export const calenderSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        updateTasks: (state, action: PayloadAction<Task>) => {
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
        removeTask: (state, action: PayloadAction<Task>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
        },
        selectTask: (state, action: PayloadAction<Task>) => {
            state.selectedTask = action.payload;
        }
    },
    selectors: {
        selectCalendarTasks: (state) => state.tasks,
        selectEditTask: (state) => state.tasks.find(task => state.selectedTask?.id === task.id),
    }
});

export const selectTaskById = (taskId: string) =>
    createSelector([selectCalendarTasks], tasks => tasks.find(task => task.id === taskId));

export const { selectCalendarTasks, selectEditTask } = calenderSlice.selectors;
export default calenderSlice.reducer;

export const { actions: calendarActions } = calenderSlice;
export const { reducer: calendarReducer } = calenderSlice;
