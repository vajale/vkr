import React from "react";
import { StyledPrices } from "@/components/StatickBlocks/Landing/Prices/styled";
import Start from "@/assets/png/landing/Start.svg";
import Base from "@/assets/png/landing/Base.svg";
import Pro from "@/assets/png/landing/Pro.svg";
import { Button } from "@mui/material";

interface Props {
    info: {
        count: string;
        store: string;
    };
    price: string;
    img: SVGAElement;
    position: string;
}

const CardContentValues: { start: Props; base: Props; pro: Props } = {
    start: {
        info: {
            count: "10",
            store: "5",
        },
        price: "500",
        img: Start,
        position: "Стартовый",
    },
    base: {
        info: {
            count: "30",
            store: "15",
        },
        price: "1000",
        img: Base,
        position: "Бизнес",
    },
    pro: {
        info: {
            count: "50",
            store: "30",
        },
        price: "1500",
        img: Pro,
        position: "Премиум",
    },
};

export const Prices = () => {
    const cardContent = ({ info, price, img, position }: Props) => {
        return (
            <div className="card-content">
                <div className="background" />
                <div className={"icon"}>
                    <img src={img} alt="start-icon" />
                </div>
                <div className={"title"}>{position}</div>
                <div className={"info"}>
                    <div className={"count"}>
                        <div className={"normal"}>Кол. участников</div>
                        <div className={"bold"}>до {info.count}</div>
                    </div>
                    <div className={"store"}>
                        <div className={"normal"}>Загрузка файлов</div>
                        <div className={"bold"}>до {info.store} гб</div>
                    </div>
                </div>
                <div className={"connect"}>
                    <div className={"title"}>{price} руб</div>
                    <Button>
                        <div className="background" />
                        <span>Подключить</span>
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <StyledPrices className={"common"}>
            <div className={"subCard"}>{cardContent(CardContentValues.start)}</div>
            <div className={"card"}>{cardContent(CardContentValues.base)}</div>
            <div className={"subCard"}>{cardContent(CardContentValues.pro)}</div>
        </StyledPrices>
    );
};
