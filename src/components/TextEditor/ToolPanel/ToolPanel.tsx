import * as React from "react";
import { useMemo } from "react";
import { useEditorApi } from "../TextEditor";
import cn from "classnames";
import { BlockType, InlineStyle } from "../TextEditor/config";
import { StyledEditorButton, StyledEditorButtonsContainer } from "@/components/PageView/ui/EditableTextField/styled";
import { Divider } from "@mui/material";
import { LucideIcon } from "@/assets/Icon";

interface PanelProps {
    position: { x: number, y: number }
}

const ToolPanel: React.FC<PanelProps> = ({ position }) => {
    const {
        toHtml,
        addLink,
        toggleBlockType,
        currentBlockType,
        toggleInlineStyle,
        hasInlineStyle,
        hasContentOnClick
    } = useEditorApi();

    const textLineButtons = useMemo(() => {
        return (
            <div>
                <StyledEditorButton
                    key={InlineStyle.ACCENT}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        toggleInlineStyle(InlineStyle.ACCENT);
                    }}
                >
                    <LucideIcon name={"LuPalette"}/>
                </StyledEditorButton>
                <StyledEditorButton
                    key={InlineStyle.BOLD}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        toggleInlineStyle(InlineStyle.BOLD);
                    }}
                >
                    <LucideIcon name={"LuBold"}/>
                </StyledEditorButton>
                <StyledEditorButton
                    key={InlineStyle.ITALIC}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        toggleInlineStyle(InlineStyle.ITALIC);
                    }}
                >
                    <LucideIcon name={"LuItalic"}/>
                </StyledEditorButton>
                <StyledEditorButton
                    key={InlineStyle.UNDERLINE}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        toggleInlineStyle(InlineStyle.UNDERLINE);
                    }}
                >
                    <LucideIcon name={"LuUnderline"}/>
                </StyledEditorButton>
            </div>
        );
    }, []);

    return (
        <StyledEditorButtonsContainer style={{ left: position.x, top: position.y }}>
            <StyledEditorButton
                className={cn(
                    "tool-panel__item",
                    currentBlockType === BlockType.h1 && "tool-panel__item_active"
                )}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.h1);
                }}
            >
                <LucideIcon name={'LuHeading1'}/>
            </StyledEditorButton>
            <Divider orientation={'vertical'}/>
            <StyledEditorButton
                className={cn(
                    "tool-panel__item",
                    currentBlockType === BlockType.h2 && "tool-panel__item_active"
                )}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.h2);
                }}
            >
                <LucideIcon name={'LuHeading2'}/>
            </StyledEditorButton>
            <Divider orientation={'vertical'}/>

            <StyledEditorButton
                className={cn(
                    "tool-panel__item",
                    currentBlockType === BlockType.h2 && "tool-panel__item_active"
                )}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.h3);
                }}
            >
                <LucideIcon name={'LuHeading3'}/>
            </StyledEditorButton>
            <Divider orientation={'vertical'}/>
            <StyledEditorButton
                className={cn(
                    "tool-panel__item",
                    currentBlockType === BlockType.default && "tool-panel__item_active"
                )}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.default);
                }}
            >
                <LucideIcon name={'LuHeading4'}/>
            </StyledEditorButton>
            <Divider orientation={'vertical'}/>
            <StyledEditorButton
                className={cn(
                    "tool-panel__item",
                    currentBlockType === BlockType.code && "tool-panel__item_active"
                )}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.code);
                }}
            >
                <LucideIcon name={'LuCode'}/>
            </StyledEditorButton>
            <StyledEditorButton
                className={cn(
                    "tool-panel__item",
                    currentBlockType === BlockType.blockquote && "tool-panel__item_active"
                )}
                onMouseDown={(e) => {
                    e.preventDefault();
                    toggleBlockType(BlockType.blockquote);
                }}
            >
                <LucideIcon name={'LuTextQuote'}/>
            </StyledEditorButton>
            <Divider orientation={'vertical'}/>
            {textLineButtons}
        </StyledEditorButtonsContainer>
    );
};

export default ToolPanel;
