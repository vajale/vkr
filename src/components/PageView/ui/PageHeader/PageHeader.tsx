import React from "react";
import { Paper, Typography } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { selectUserAuth } from "@/store/slices/userSlice";
import { MaterialIcon } from "@/assets/Icon";
import { StyledPageHeader } from "@/components/PageView/ui/PageHeader/styled";

interface HeaderProps {
    text: string;
    background?: string;
    className?: string;
    onContentChange?: (content: string) => void;
    canEdit?: boolean;
}

const PageHeader = (props: HeaderProps) => {
    const { text, background, onContentChange, canEdit } = props;
    const [isFavorite, setIsFavorite] = React.useState(false);

    const handleHeaderContentChange = (e: React.FocusEvent<HTMLSpanElement, Element>) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const content = e.currentTarget.textContent!;

        if (onContentChange) {
            onContentChange(content);
        }
    };

    const isHaveBackground = background !== "";

    return (
        <StyledPageHeader>
            {isHaveBackground && (
                <Paper
                    className={"background"}
                    style={{
                        width: 1270,
                        borderRadius: "14px 14px 0 0",
                        height: 200,
                        backgroundColor: background !== "" ? background : "none",
                    }}>
                    <div
                        className={"grade-wrapper"}
                        onClick={() => {
                            setIsFavorite(!isFavorite);
                        }}>
                        <MaterialIcon
                            name={"MdStars"}
                            className={`favorite${isFavorite ? "--active" : ""}`}
                        />
                    </div>
                </Paper>
            )}

            <Typography
                contentEditable={canEdit}
                variant={"h4"}
                sx={{ mt: 7, mb: 7, ml: 11, fontWeight: 700, width: 700 }}
                className={"page-title"}
                onBlur={handleHeaderContentChange}>
                {text}
            </Typography>
        </StyledPageHeader>
    );
};

export default PageHeader;
