import React from "react";
import { Avatar, Paper, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

interface HeaderProps {
    text: string;
    hover?: boolean;
    className?: string;
}

const PageHeader = (props: HeaderProps) => {
    const { text, className, hover = false } = props;

    return (
        <div>
            {hover && (
                <div
                    style={{
                        borderRadius: 7,
                        height: 200,
                        background: "orange",
                    }}>
                    <Avatar sx={{ bgcolor: deepPurple[500], display: "flex", top: 180, left: 20 }}>
                        N
                    </Avatar>
                </div>
            )}
            <Typography variant={"h4"}
                        sx={{ mt: 7, mb: 7, ml: 11, fontWeight: 700 }}
                        className={"page-title"}>
                {text}
            </Typography>
        </div>
    );
};

export default PageHeader;
