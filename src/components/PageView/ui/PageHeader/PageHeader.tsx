import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import { selectUserAuth, selectUserFavorites } from "@/store/slices/userSlice";
import { MaterialIcon } from "@/assets/Icon";
import { StyledPageHeader } from "@/components/PageView/ui/PageHeader/styled";
import {
    useAddToFavoritesMutation,
    useRemoveFavoritesMutation,
} from "@/api/firebasePageAPI/pagesService";
import { selectPageId } from "@/store/slices/pageSlice";
import useToast from "@/utils/hooks/useToast";
import { type Page } from "@/components/PageView/model/types";

interface HeaderProps {
    page: Page;
    onContentChange?: (content: string) => void;
    canEdit?: boolean;
    onFavoritesAdd: () => void;
}

const PageHeader = (props: HeaderProps) => {
    const { onContentChange, canEdit, onFavoritesAdd, page } = props;

    const { success } = useToast();

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

    const isHaveBackground = page.visual?.background !== "";

    const isFavorite = userFavoritePages.find((page) => page === currentPageId) != null;
    const headerText = page.visual?.name ?? "Новая страница";
    const headerBackground = page.visual?.background ?? "none";

    return (
        <StyledPageHeader>
            {isHaveBackground && (
                <Paper
                    className={"background"}
                    style={{
                        width: "100%",
                        borderRadius: "14px 14px 0 0",
                        height: 200,
                        backgroundColor: headerBackground,
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
            <Stack>
                <Typography sx={{ mt: 7, ml: 11, opacity: 0.3 }}>
                    <strong>{page.id}</strong>
                    {page.child !== undefined && page.child}
                </Typography>
                <Typography
                    contentEditable={canEdit}
                    variant={"h4"}
                    sx={{ ml: 11, fontWeight: 700, width: 400 }}
                    className={"page-title"}
                    onBlur={handleHeaderContentChange}>
                    {headerText}
                </Typography>
            </Stack>
        </StyledPageHeader>
    );
};

export default PageHeader;
