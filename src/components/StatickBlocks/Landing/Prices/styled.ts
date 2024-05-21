import { styled } from "@mui/material";

export const StyledPrices = styled("div")(() => ({
    display: "flex",
    flexDirection: "row",
    gap: 30,
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",

    ".common": {
        border: "8px",
    },

    ".card": {
        position: "relative",
        borderRadius: "8px",
        backgroundColor: "#EDEDED",
        width: "20vw",
        height: "96%",

        ".card-content": {
            height: "92%",
            filter: "none !important",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "20px 0",

            ".background": {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#EDEDED",
                filter: "blur(3px)",
                zIndex: "1",
            },

            ".icon": {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "250px",
                height: "250px",
                zIndex: "2",
            },

            ".title": {
                color: "black",
                zIndex: "2",
                fontSize: "32px",
                fontWeight: "900",
                textShadow: "0px 2px 2px rgba(0, 0, 0, 0.6)",
            },

            ".info": {
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",

                zIndex: "2",
                color: "black",
                fontSize: "24px",
                gap: 15,

                ".bold": {
                    fontWeight: "600",
                },

                ".count": {
                    justifyContent: "center",
                    display: "flex",
                    gap: 10,
                },
                ".store": {
                    justifyContent: "center",
                    display: "flex",
                    gap: 10,
                },
            },

            ".connect": {
                zIndex: "2",
                display: "flex",
                flexDirection: "column",
                gap: 15,
                alignItems: "center",

                ".title": {
                    textShadow: "0px 2px 2px rgba(0, 0, 0, 0.6)",
                },

                button: {
                    ".background": {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "#FF778F",
                        filter: "blur(3px)",
                        zIndex: "1",
                    },

                    span: {
                        textTransform: "none",
                        fontSize: "24px",
                        fontWeight: "500",
                        zIndex: "2",
                    },

                    backgroundColor: "#FF778F",
                    width: 250,
                    height: 60,
                    borderRadius: 10,
                },
            },
        },
    },
    ".subCard": {
        position: "relative",
        borderRadius: "8px",
        backgroundColor: "#EDEDED",
        width: "20vw",
        height: "88%",

        ".card-content": {
            height: "80%",
            filter: "none !important",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 40,
            justifyContent: "space-between",
            alignItems: "center",
            margin: "20px 0",

            ".background": {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#EDEDED",
                filter: "blur(3px)",
                zIndex: "1",
            },

            ".icon": {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "250px",
                height: "250px",
                zIndex: "2",
            },

            ".title": {
                color: "black",
                zIndex: "2",
                fontSize: "32px",
                fontWeight: "900",
                textShadow: "0px 2px 2px rgba(0, 0, 0, 0.6)",
            },

            ".info": {
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",

                zIndex: "2",
                color: "black",
                fontSize: "24px",
                gap: 15,

                ".bold": {
                    fontWeight: "600",
                },

                ".count": {
                    justifyContent: "center",
                    display: "flex",
                    gap: 10,
                },
                ".store": {
                    justifyContent: "center",
                    display: "flex",
                    gap: 10,
                },
            },

            ".connect": {
                zIndex: "2",
                display: "flex",
                flexDirection: "column",
                gap: 15,
                alignItems: "center",

                ".title": {
                    textShadow: "0px 2px 2px rgba(0, 0, 0, 0.6)",
                },

                button: {
                    ".background": {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "#80DBF8",
                        filter: "blur(3px)",
                        zIndex: "1",
                    },

                    span: {
                        textTransform: "none",
                        fontSize: "24px",
                        fontWeight: "500",
                        zIndex: "2",
                    },

                    backgroundColor: "#80DBF8",
                    width: 250,
                    height: 60,
                    borderRadius: 10,
                },
            },
        },
    },
}));
