import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectSignStatus, userActions } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { SIGN_STATS } from "@/store/slices/userSlice/types";

export const useSignStatus = () => {
    const currentStatus = useAppSelector(selectSignStatus);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (currentStatus === SIGN_STATS.error) {
            setTimeout(() => {
                dispatch(userActions.setSignStatus(SIGN_STATS.pending));
            }, 5000);
        }
    }, [currentStatus]);
};
