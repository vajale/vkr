export const URL = {
    HOME: "/home",
    CALENDAR: "/calendar",
    PAGE: "/page",
    UNAUTHORIZED: "/unauthorized",
    LANDING: "/landing",
    INVITE: "/invite",

    MAIN: "main",
    PRICES: "prices",
    CONTACT: "contact",
    ABOUT: "about",
};

export const NAVIGATION = {
    HOME: URL.HOME,
    PAGE: `${URL.PAGE}/`,
    INVITE: `${URL.INVITE}/`,
    LANDING: {
        MAIN: `${URL.LANDING}/${URL.MAIN}`,
        PRICES: `${URL.LANDING}/${URL.PRICES}`,
        CONTACT: `${URL.LANDING}/${URL.CONTACT}`,
        ABOUT: `${URL.LANDING}/${URL.ABOUT}`,
    },
};
