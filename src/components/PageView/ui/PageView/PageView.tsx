import React from "react";

import PageHeader from "../PageHeader/PageHeader";
import {Paper} from "@mui/material";
import {useDocumentParser} from "../../model/hooks/documentParser";
import {DocumentBlockType} from "../../model/types";

const PageView = () => {
    const parsedData = useDocumentParser({
        blocks: [
            {
                id: 'fff',
                type: DocumentBlockType.TEXT,
                title: 'negro el pidrasos',
                paragraphs: ['lee'],
                children: {
                    id: 'sinok ebany',
                    type: DocumentBlockType.CODE,
                    code: 'event.poshelNahoy()'
                }
            },
            {
                id: 'ddd',
                type: DocumentBlockType.CHECKBOX,
                title: 'bombaclat',
                flag: true
            },
            {
                id: 'sss',
                type: DocumentBlockType.CODE,
                code: "window.sosnihuica()",
            }
        ]
    })

    return (
        <>
            <PageHeader text={"Page"}/>
            <Paper
                sx={{
                    width: 600,
                    height: 900,
                    p: 2,
                }}
            >
                {parsedData}
            </Paper>
        </>
    );
};

export default PageView;
