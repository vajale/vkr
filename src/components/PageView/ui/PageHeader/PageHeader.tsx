import React from "react";
import { Paper, Typography } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { selectUserAuth } from "@/store/slices/userSlice";

interface HeaderProps {
    text: string;
    background?: string;
    className?: string;
    onContentChange?: (content: string) => void;
    canEdit?: boolean;
}

const PageHeader = (props: HeaderProps) => {
    const { text, background, onContentChange, canEdit } = props;

    const handleHeaderContentChange = (e: React.FocusEvent<HTMLSpanElement, Element>) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const content = e.currentTarget.textContent!;

        if (onContentChange) {
            onContentChange(content);
        }
    };

    const isHaveBackground = background !== "";

    return (
        <div>
            {isHaveBackground &&
                <Paper
                    style={{
                        width: 1270,
                        borderRadius: '14px 14px 0 0',
                        height: 200,
                        backgroundColor: background !== '' ? background : 'none',
                    }}>
                </Paper>}

            <Typography contentEditable={canEdit} variant={"h4"}
                        sx={{ mt: 7, mb: 7, ml: 11, fontWeight: 700, width: 700 }}
                        className={"page-title"}
                        onBlur={handleHeaderContentChange}>
                {text}
            </Typography>
        </div>
    );
};

export default PageHeader;
