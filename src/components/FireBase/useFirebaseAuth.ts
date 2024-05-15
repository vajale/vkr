import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { useAppDispatch } from "@/store/hooks";
import { selectUserAuth, userActions } from "store/slices/userSlice";
import { type User } from "@/utils/types";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { firebaseAuth } from ".";
import { useAuthState } from "react-firebase-hooks/auth";

export const useFirebaseAuth = () => {
    const dispatch = useAppDispatch();
    const authState = useAuthState(firebaseAuth);

    const isAuth = useSelector(selectUserAuth);

    let firebaseUser: User | null = null;

    useEffect(() => {
        const listen = onAuthStateChanged(firebaseAuth, (user) => {
            if (user == null) return;

            const userData: User = {
                id: user.uid,
                username: user.email
            };

            firebaseUser = userData;

            dispatch(userActions.setAuthData(userData));
        });

        return () => {
            listen();
        };
    }, []);

    const handleCreateFirebaseUserWithEmailAndPassword = async (email: string, password: string) => {
        console.log('happen shit');
        const { user, providerId } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    };

    const handleFirebaseSignInWithEmailAndPassword = async (email: string, password: string) => {
        const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
    };

    const handleFirebaseSignOut = async () => {
        await signOut(firebaseAuth);

        dispatch(userActions.logout());
    };

    return {
        isAuth,
        createUser: async (email: string, password: string) => { await handleCreateFirebaseUserWithEmailAndPassword(email, password); },
        signInUser: async (email: string, password: string) => { await handleFirebaseSignInWithEmailAndPassword(email, password); },
        signOutUser: async () => { await handleFirebaseSignOut(); },
        authState,
        firebaseUser,
    };
};
