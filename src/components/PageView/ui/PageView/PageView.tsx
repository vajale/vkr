import React from "react";
import { Paper } from "@mui/material";
import { useDocumentParser } from "../../model/hooks/documentParser";
import { DocumentBlockType } from "../../model/types";

const mock =
    "Sed ut perspiciatis, inventore veritatis et quasi architecto beatae vitae pedit, quo minus id, quod maxime   perferendis doloribus asperiores repellat.";
const mock2 =
    "Ae ab illo inventore veritatis et quasi architecto beatae vitae pedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.";

const PageView = () => {
    const parsedData = useDocumentParser({
        blocks: [
            {
                id: "fff",
                type: DocumentBlockType.TEXT,
                title: "negro el pidrasos",
                paragraphs: ["lee"],
            },
            {
                id: "123123",
                type: DocumentBlockType.CHECKBOX,
                title: "bombaclat",
                flag: true,
            },
            {
                id: "sss",
                type: DocumentBlockType.CODE,
                code: "window.sosnihuica()",
                children: {
                    id: "sinok ebany",
                    type: DocumentBlockType.CODE,
                    code: "event.poshelNahoy()",
                    children: {
                        id: "sinok ebany",
                        type: DocumentBlockType.CODE,
                        code: "event.poshelNahoy()",
                    },
                },
            },
            {
                id: "safasf",
                type: DocumentBlockType.TEXT,
                title: "Lorem ipsum ",
                paragraphs: [mock, mock2],
            },
        ],
    });

    return (
        <>
            <Paper
                sx={{
                    width: 600,
                    height: 900,
                    p: 2,
                    bgcolor: "whitesmoke",
                }}>
                {parsedData}
            </Paper>
        </>
    );
};

export default PageView;
