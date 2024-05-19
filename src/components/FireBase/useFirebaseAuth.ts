import { onAuthStateChanged, signOut } from "firebase/auth";
import { useAppDispatch } from "@/store/hooks";
import { selectUserAuth, userActions } from "store/slices/userSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { firebaseAuth } from ".";
import { useAuthState } from "react-firebase-hooks/auth";
import { type User, UserFirebase } from "@/store/slices/userSlice/types";
import { useGetUserByIdQuery, useLazyGetUserByIdQuery, useLoginMutation, useRegisterMutation } from "@/api/usersApi/usersFirebaseService";
import { type IRegisterForm } from "@/components/Login/RegisterForm/types";

export const useFirebaseAuth = () => {
    const dispatch = useAppDispatch();
    const authState = useAuthState(firebaseAuth);

    const [createFirebaseUser, { data: registerLoading }] = useRegisterMutation();
    const [loginUser, { data: loginLoading }] = useLoginMutation();

    const [fetchUserFirebaseData] = useLazyGetUserByIdQuery({ userId: firebaseAuth.currentUser?.uid });
    const isAuth = useSelector(selectUserAuth);

    const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                const userAuthData: User = {
                    id: user.uid,
                };

                setFirebaseUser(userAuthData);
                dispatch(userActions.setAuthData(userAuthData));
                dispatch(userActions.initializeUser());

                const firebaseUser = fetchUserFirebaseData({ userId: user.uid });

                void firebaseUser.then(req => {
                    if (req.data) {
                        dispatch(userActions.setFirebaseData(req.data));
                    }
});
            } else {
                setFirebaseUser(null);
                dispatch(userActions.logout());
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const refetchUserData = () => {
        const firebaseUser = fetchUserFirebaseData({ userId: firebaseAuth.currentUser?.uid });

        void firebaseUser.then(req => {
            if (req.data) {
                dispatch(userActions.setFirebaseData(req.data));
            }
        });
    };

    const handleCreateFirebaseUserWithEmailAndPassword = async (
        email: string,
        password: string,
        registerData: IRegisterForm,
    ) => {
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
        signInUser: async (email: string, password: string) => {
            await handleFirebaseSignInWithEmailAndPassword(email, password);
        },
        signOutUser: async () => {
            await handleFirebaseSignOut();
        },
        firebaseUser,
        authState,
        isLoading: loginLoading ?? registerLoading,
        refetchUserData
    };
};
