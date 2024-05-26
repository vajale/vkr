import * as React from "react";
import { useEditorApi } from "../TextEditor";
import cn from "classnames";
import { BlockType, InlineStyle } from "../TextEditor/config";
import { StyledEditorButton, StyledEditorButtonsContainer } from "@/components/PageView/ui/EditableTextField/styled";
import { Divider } from "@mui/material";

const ToolPanel: React.FC = () => {
  const {
    toHtml,
    addLink,
    toggleBlockType,
    currentBlockType,
    toggleInlineStyle,
    hasInlineStyle,
  } = useEditorApi();

  return (
    <StyledEditorButtonsContainer flexDirection={'row'} className="tool-panel">
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
        Заголовок
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
        Подзаголовок
      </StyledEditorButton>
        <Divider orientation={'vertical'}/>

        <StyledEditorButton
        className={cn(
          "tool-panel__item",
          currentBlockType === BlockType.cite && "tool-panel__item_active"
        )}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlockType(BlockType.cite);
        }}
      >
        Сноска
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
        Простой
      </StyledEditorButton>
        <Divider orientation={'vertical'}/>
        {Object.values(InlineStyle).map((v) => (
        <StyledEditorButton
          key={v}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleInlineStyle(v);
          }}
        >
          {v}
        </StyledEditorButton>
      ))}
        <Divider orientation={'vertical'}/>
        <StyledEditorButton
        className="tool-panel__item"
        onClick={() => {
          console.log(toHtml());
        }}
      >
        Print
      </StyledEditorButton>
    </StyledEditorButtonsContainer>
  );
};

export default ToolPanel;
