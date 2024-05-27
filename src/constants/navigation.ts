export const URL = {
    HOME: "/home",
    CALENDAR: "/calendar",
    PAGE: "/page",
    UNAUTHORIZED: "/unauthorized",
    LANDING: "/landing",
    INVITE: "/invite",
    TASKS: "/tasks",

    MAIN: "main",
    PRICES: "prices",
    CONTACT: "contact",
    ABOUT: "about",
};

export const NAVIGATION = {
    HOME: URL.HOME,
    PAGE: `${URL.PAGE}/`,
    TASKS: `${URL.TASKS}/`,
    INVITE: `${URL.INVITE}/`,
    LANDING: {
        MAIN: `${URL.LANDING}/${URL.MAIN}`,
        PRICES: `${URL.LANDING}/${URL.PRICES}`,
        CONTACT: `${URL.LANDING}/${URL.CONTACT}`,
        ABOUT: `${URL.LANDING}/${URL.ABOUT}`,
    },
};
