import React from "react";
import { StyledCarouselContent } from "@/components/StatickBlocks/Landing/Carousel/content/styled";

export const CarouselContent = () => {
    return (
        <StyledCarouselContent>
            <div className={"description"}>
                <div className={"header-large"}>Добро пожаловать</div>
                <div className={"header"}>
                    Присоединяйтесь к нашему продукту и обретите новый уровеь управления вашей
                    информацией
                </div>
                <div className={"title"}>Разработано студентами за полторы шавухи</div>
            </div>
            <div className={"image-wrapper"}></div>
        </StyledCarouselContent>
    );
};
