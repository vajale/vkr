import { Route } from "react-router-dom";
import { type DocumentPageLinkBlock } from "../../../model/types";

interface PageLinkProps {
    linkData: DocumentPageLinkBlock,
}

export const DocumentPageLinkComponent = (props: PageLinkProps) => {
    return (
        <div>
            <Route path={'/'}></Route>
        </div>
    );
};
