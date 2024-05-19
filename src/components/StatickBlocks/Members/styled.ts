import { Skeleton, styled } from "@mui/material";
import { type IExtendedThemeProps } from "@/themes/types";

interface IProps {
    theme?: IExtendedThemeProps;
    clicked?: boolean;
}

export const StyledUserSkeleton = styled(Skeleton)(() => ({
    width: "100%",
    height: "80px"
}));

interface IStyledUserProps extends IExtendedThemeProps {
    outlined: boolean
}

export const StyledUser = styled("div")(({ outlined, theme }: IStyledUserProps) => ({
    display: "flex",
    flexDirection: "row",
    alignContent: 'center',
    alignItems: 'center',
    width: "95%",
    justifyContent: "space-between",
    height: "80px",
    border: outlined ? `solid 2px ${theme?.palette.borderColors.secondary}` : 'none',
    borderRadius: '7px',
    ".user-profile": {
        display: "flex",
        gap: 5,
        marginLeft: '7px',

        ".user": {
            display: "flex",
            flexDirection: "column",
            gap: 5,
        },

        ".main-data": {
            display: "flex",
            flexDirection: "row",
            gap: 5,
            ".role": {
                minWidth: "50px",
                backgroundColor: "#F5E1A4",
                padding: "3px 5px",
                borderRadius: 10,
            },
        },

        img: {
            borderRadius: 50,
            width: "50px",
            height: "50px",
            background: "black",
        },
    },
}));

export const StyledMembers = styled("div")(({ theme }: IProps) => ({
    minWidth: "50vw",
    minHeight: "600px",
    overflow: "hidden",
    padding: "30px 50px ",
    display: "flex",
    flexDirection: "column",
    gap: 30,

    ".header": {
        fontSize: theme?.theme?.textSize.sizeText32,
        alignItems: "end",
        display: "flex",
        gap: "10px",
        paddingBottom: "20px",
        borderBottom: "1px solid #ddd",
    },

    ".invite-wrapper": {
        display: "flex",
        flexDirection: "row",
        gap: 20,
        justifyContent: "space-between",
        width: "100%",
        maxHeight: 55,

        ".MuiFormControl-root": {
            width: "100%",
        },
        ".copy": {
            backgroundColor: "#000000",
            color: "white",
            width: "200px",
            padding: "10px 15px",
            borderRadius: 15,
        },
    },

    ".members": {
        maxHeight: "60%",
        overflow: "auto",

        ".title": {
            color: "#8e8e8e",
        },

        ".users": {
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            gap: 8,
        },
    },
}));
