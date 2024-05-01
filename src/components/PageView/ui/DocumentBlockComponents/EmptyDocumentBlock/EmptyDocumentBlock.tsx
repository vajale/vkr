import React from "react";

interface BlockProps {
    onClick: () => void,
}

const EmptyDocumentBlock = (props: BlockProps) => {
    const { onClick } = props;

    const handleClick = () => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (onClick) {
            onClick();
        }
    };

    return (
        <div onClick={handleClick} style={{ height: 400, cursor: 'text' }}>

        </div>
    );
};
export default EmptyDocumentBlock;
