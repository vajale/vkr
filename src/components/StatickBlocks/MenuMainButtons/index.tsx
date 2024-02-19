import React from "react";

import ButtonWithIcon from "../../buttons/ButtonWithIcon";

import { StyledMainButtons } from "./styled";

const MenuMainButtons: React.FC = () => {
  return (
    <StyledMainButtons>
      <ButtonWithIcon
        svg={
          <div
            style={{ minHeight: "10px", minWidth: "10px", background: "red" }}
          />
        }
        title={"Обновления"}
      />
      <ButtonWithIcon
        svg={
          <div
            style={{ minHeight: "10px", minWidth: "10px", background: "red" }}
          />
        }
        title={"Участники"}
      />
    </StyledMainButtons>
  );
};

export default MenuMainButtons;
