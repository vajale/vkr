import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { useAppDispatch } from "@/store/hooks";
import { selectUserAuth, userActions } from "store/slices/userSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { firebaseAuth } from ".";
import { useAuthState } from "react-firebase-hooks/auth";
import { type User } from "@/store/slices/userSlice/types";
import { useCreateUserMutation, useLoginMutation } from "@/features/usersService/usersService";
import { type IRegisterForm } from "@/components/Login/RegisterForm/types";

export const useFirebaseAuth = () => {
    const dispatch = useAppDispatch();
    const authState = useAuthState(firebaseAuth);

    const [createFirebaseUser, { data: registerLoading }] = useCreateUserMutation();
    const [loginUser, { data: loginLoading }] = useLoginMutation();

    const isAuth = useSelector(selectUserAuth);

    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                const userData: User = {
                    id: user.uid,
                    username: user.email ?? '',
                };

                setFirebaseUser(userData);
                dispatch(userActions.setAuthData(userData));
            } else {
                setFirebaseUser(null);
                dispatch(userActions.logout());
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleCreateFirebaseUserWithEmailAndPassword = async (email: string, password: string, registerData: IRegisterForm) => {
        void createFirebaseUser({ email, password, registerData });
    };

    const handleFirebaseSignInWithEmailAndPassword = async (email: string, password: string) => {
        void loginUser({ email, password });
    };

    const handleFirebaseSignOut = async () => {
        await signOut(firebaseAuth);

        dispatch(userActions.logout());
    };

    return {
        isAuth,
        createUser: async (email: string, password: string, registerData: IRegisterForm) => {
            await handleCreateFirebaseUserWithEmailAndPassword(email, password, registerData);
        },
        signInUser: async (email: string, password: string) => { await handleFirebaseSignInWithEmailAndPassword(email, password); },
        signOutUser: async () => { await handleFirebaseSignOut(); },
        firebaseUser,
        authState,
        isLoading: loginLoading ?? registerLoading

    };
};
