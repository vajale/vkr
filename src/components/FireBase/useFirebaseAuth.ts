import {getAuth, onAuthStateChanged} from "firebase/auth";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {useAppDispatch} from "@/store/hooks";
import {selectUserAuth, userActions} from "store/slices/userSlice";
import {User} from "@/utils/types";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { firebaseApp, firebaseAuth } from ".";
import {useAuthState} from "react-firebase-hooks/auth";

export const useFirebaseAuth = () => {
    const dispatch = useAppDispatch()
    const authState = useAuthState(firebaseAuth)

    const isAuth = useSelector(selectUserAuth)

    let nigauser: User = null

    useEffect(() => {
        const listen = onAuthStateChanged(firebaseAuth, (user) => {
            if(user == null) return

            const userData: User = {
                id: user.uid,
                // @ts-ignore
                username: user.email
            }
            nigauser = userData

            dispatch(userActions.setAuthData(userData))
        })


        return () => {
            listen()
        }
    }, []);

    const handleCreateFirebaseUserWithEmailAndPassword = async (email: string, password: string) => {
        const {user, providerId} = await createUserWithEmailAndPassword(firebaseAuth, email, password)

    }

    const handleFirebaseSignInWithEmailAndPassword = async (email: string, password: string) => {
        const {user} = await signInWithEmailAndPassword(firebaseAuth, email, password)
    }

    const handleFirebaseSignOut = async () => {
        await signOut(firebaseAuth)

        dispatch(userActions.logout())

    }

    return {
        isAuth,
        createUser: (email: string, password: string) => handleCreateFirebaseUserWithEmailAndPassword(email, password),
        signInUser: (email: string, password: string) => handleFirebaseSignInWithEmailAndPassword(email, password),
        signOutUser: () => handleFirebaseSignOut(),
        authState,
        nigauser
    }
}