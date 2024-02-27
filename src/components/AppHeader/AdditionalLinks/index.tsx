import React from "react";
import {StyledAdditionalLinks} from "@/components/AppHeader/AdditionalLinks/styled";
import {APP_HEADER_ADDITIONAL_LINKS} from "@/components/AppHeader/constants";
import {LinkItem} from "@/components/AppHeader/AdditionalLinks/LinkItem";

const AdditionalLinks: React.FC = () => {
    return <StyledAdditionalLinks className="additional-links">
        <ul className="links">
            {APP_HEADER_ADDITIONAL_LINKS.map((link) => (
                <LinkItem key={link.title} href={link.href} title={link.title} svg={link.svg}/>
            ))}
        </ul>
    </StyledAdditionalLinks>
}

export default AdditionalLinks;
