import React, { useEffect, useState } from "react";
import { Avatar, Paper, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { pageActions, selectPageName } from "@/store/slices/pageSlice";

interface HeaderProps {
    text: string;
    background?: string;
    className?: string;
    onContentChange?: () => void;
}

const PageHeader = (props: HeaderProps) => {
    const { text, className, background, onContentChange } = props;

    const [content, setContent] = useState<string>(() => text);

    const dispatch = useAppDispatch();

    const handleHeaderContentChange = () => {
        dispatch(pageActions.updatePageHeader({ name: content }));
    };

    return (
        <div>

            <div
                style={{
                    borderRadius: 7,
                    height: 200,
                    backgroundColor: "orange",
                }}>
            </div>

            <Typography contentEditable={true} variant={"h4"}
                        sx={{ mt: 7, mb: 7, ml: 11, fontWeight: 700 }}
                        className={"page-title"}
                        onInput={(e) => {
                            setContent(e.currentTarget.textContent!);
                        }}
                        onBlur={handleHeaderContentChange}
            >
                {text}
            </Typography>
        </div>
    );
};

export default PageHeader;
