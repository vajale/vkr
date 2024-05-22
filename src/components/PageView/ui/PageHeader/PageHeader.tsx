import React from "react";
import { Paper, Typography } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { selectUserAuth, selectUserFavorites } from "@/store/slices/userSlice";
import { MaterialIcon } from "@/assets/Icon";
import { StyledPageHeader } from "@/components/PageView/ui/PageHeader/styled";
import { useAddToFavoritesMutation, useRemoveFavoritesMutation } from "@/api/firebasePageAPI/pagesService";
import { selectPageId } from "@/store/slices/pageSlice";
import useToast from "@/utils/hooks/useToast";

interface HeaderProps {
    text: string;
    background?: string;
    className?: string;
    onContentChange?: (content: string) => void;
    canEdit?: boolean;
    onFavoritesAdd: () => void
}

const PageHeader = (props: HeaderProps) => {
    const { text, background, onContentChange, canEdit, onFavoritesAdd } = props;

    const { success, warning } = useToast();

    const userFavoritePages = useAppSelector(selectUserFavorites);
    const currentPageId = useAppSelector(selectPageId);
    const [addToFavorites] = useAddToFavoritesMutation();
    const [removeFromFavorites] = useRemoveFavoritesMutation();

    const handleHeaderContentChange = (e: React.FocusEvent<HTMLSpanElement, Element>) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const content = e.currentTarget.textContent!;

        if (onContentChange) {
            onContentChange(content);
        }
    };

    const isHaveBackground = background !== "";

    const isFavorite = userFavoritePages.find(page => page === currentPageId) != null;

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
                        onMouseDown={() => {
	                        void addToFavorites({ pageId: currentPageId });
	                        if (isFavorite) {
		                        void removeFromFavorites({ pageId: currentPageId });
		                        success("Страница удаленна из избранного");
		                        onFavoritesAdd();
	                        } else {
		                        void addToFavorites({ pageId: currentPageId });
		                        success("Страница добавлена в избранное");
		                        onFavoritesAdd();
	                        }
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
