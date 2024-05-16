import React, { useMemo } from "react";
import { StyledCarouselContent } from "@/components/StatickBlocks/Landing/Carousel/content/styled";
import { type ICarouselContent } from "./types";
import { Button, CircularProgress, Stack } from "@mui/material";
import { useFetchLandingDataQuery } from "@/api/landing";
import { useFirebaseAuth } from "@/components/FireBase";
import { useNavigate } from "react-router-dom";
import { NAVIGATION } from "@/constants/navigation";

export const CarouselContent = ({ lHeader, header, title, imgId, index }: ICarouselContent) => {
    const { data, isFetching } = useFetchLandingDataQuery({ imageId: imgId });
    const { isAuth } = useFirebaseAuth();
    const navigate = useNavigate();

    const getImageComponent = () => {
        if (isFetching) {
            return <CircularProgress />;
        }

        return <img src={data} alt="logo" className={"logo"} />;
    };

    const handleAuthorized = () => {
        console.log("navigate");
        navigate(NAVIGATION.HOME);
    };

    const handleClick = () => {
        if (isAuth) {
            handleAuthorized();
        }
    };

    const ButtonTitle = useMemo(() => {
        if (isAuth) {
            return "Войти в СЕЙФ";
        }
        return "попробывать бесплатно";
    }, [isAuth]);

    return (
        <StyledCarouselContent>
            <div className={"description-wrapper"}>
                <div className={"description"}>
                    <div className={"header-large"}>{lHeader}</div>
                    <div className={"header"}>{header}</div>
                    <div className={"title"}>{title}</div>
                </div>
                <Stack gap={5}>
                    <Button className={"try-free"} onClick={handleClick}>
                        <p>{ButtonTitle}</p>
                    </Button>
                    <div className={"counter-wrapper"}>
                        <span className={"counter-value"}>{"0." + index}</span>
                        <span className={"counter"}>
                            Листайте, чтобы узнать подробнее о сервисе
                        </span>
                    </div>
                </Stack>
            </div>
            <div className={"image-wrapper"}>{getImageComponent()}</div>
        </StyledCarouselContent>
    );
};
