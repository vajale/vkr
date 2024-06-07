import type { SimplyPage } from "@/api/firebasePageAPI/pagesEndpoins";
import PageLink from "@/components/PageLink/PageLink";
import React from "react";

interface LinkProps {
    page: SimplyPage,
    onPageDelete?: () => void
}

const LayoutPageLink = (props: LinkProps) => {
    const { page, onPageDelete } = props;

    const handleCreateChildrenPage = () => {

    };

    return (
        <PageLink
            href={page.id}
            label={page.visual?.name}
            width={290}
            onPageDelete={onPageDelete}
            icon={"MdOutlineFavoriteBorder"}
            onChildrenPageCreated={handleCreateChildrenPage}
        />
    );
};

export default LayoutPageLink;
