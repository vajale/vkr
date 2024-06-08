import { type Task } from "@/components/PageView/model/types";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestoreDB } from "@/components/FireBase";
import { type UserFirebaseRequest } from "@/api/usersApi/usersFirebaseEndpoints";
import { firebaseApi } from "@/api";

export const tasksEndpoints = firebaseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query<Task[], { userId: string }>({
            async queryFn ({ userId }) {
                const userIdRef = doc(firestoreDB, "users", userId);

                try {
                    const queryData = await getDoc(userIdRef)
                        .then((doc) => doc.data())
                        .catch((error) => {
                            console.log(error);
                        });

                    const userData: UserFirebaseRequest = queryData as UserFirebaseRequest;

                    return {
                        data: userData.tasks
                    };
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        updateTask: builder.mutation<Task, { taskToUpdate: Task, userId: string }>({
            async queryFn ({ taskToUpdate, userId }) {
                try {
                    const userIdRef = doc(firestoreDB, "users", userId);

                    const queryData = await getDoc(userIdRef)
                        .then((doc) => doc.data())
                        .catch((error) => {
                            console.log(error);
                        });

                    const userData: UserFirebaseRequest = queryData as UserFirebaseRequest;

                    const updatedTaskArray = userData.tasks?.map(item => {
                        if (item.id === taskToUpdate.id) {
                            return taskToUpdate;
                        }

                        return item;
                    });

                    await updateDoc(userIdRef, {
                        tasks: updatedTaskArray
                    });

                    return taskToUpdate;
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        updateAllTasks: builder.mutation<Task[], { tasks: Task[], userId: string }>({
            async queryFn ({ tasks, userId }) {
                try {
                    const userIdRef = doc(firestoreDB, "users", userId);

                    await updateDoc(userIdRef, {
                        tasks
                    });

                    return tasks;
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        addTask: builder.mutation<Task, { task: Task, userId: string }>({
            async queryFn ({ task, userId }) {
                try {
                    const userIdRef = doc(firestoreDB, "users", userId);

                    await updateDoc(userIdRef, {
                        tasks: arrayUnion(task)
                    });
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        removeTask: builder.mutation<Task, { task: Task, userId: string }>({
            async queryFn ({ task, userId }) {
                try {
                    const userIdRef = doc(firestoreDB, "users", userId);

                    await updateDoc(userIdRef, {
                        tasks: arrayRemove(task)
                    });
                } catch (error) {
                    console.error(error);
                }
            },
        }),
    })
});

export const { useAddTaskMutation, useGetTasksQuery, useUpdateTaskMutation, useRemoveTaskMutation, useUpdateAllTasksMutation } = tasksEndpoints;
