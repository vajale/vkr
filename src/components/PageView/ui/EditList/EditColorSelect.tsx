import { type DocumentBlock, DocumentBlockType } from "@/components/PageView/model/types";
import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { pageActions, selectPage } from "@/store/slices/pageSlice";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { MenuItem, Stack, Typography } from "@mui/material";
import { namedRainbowColors, rainbowColors } from "@/utils/mock/mockdata";
import { selectUsername } from "@/store/slices/userSlice";
import { StyledEditColorBox, StyledListButton } from "@/components/PageView/ui/AddList/styled";
import { StyledEditBox } from "@/components/PageView/ui/EditList/styled";
import { useClickOutside } from "@/utils/hooks/useClickOutside";

interface Props {
    block: DocumentBlock,
    onSelect: () => void,
    onOutsideClick: () => void,
    label?: string
}

const EditColorSelect = (props: Props) => {
    const { onSelect, block, onOutsideClick, label = 'Редактировать...' } = props;

    const [variant, setVariant] = React.useState(block.textType?.fontColor);

    const username = useAppSelector(selectUsername);
    const page = useAppSelector(selectPage);
    const ref = useClickOutside(onOutsideClick);

    const dispatch = useAppDispatch();

    const handleChange = (color: string) => {
        dispatch(pageActions.updateBlock({
            block: {
                ...block,
                textType: {
                    ...block.textType,
                    backgroundColor: color
                }
            },
            username
        }));

        onSelect();
        console.log(page);
    };

    return (
        <StyledEditColorBox ref={ref} animate={{ scale: 1 }} initial={{ scale: 0 }}>
            <Typography p={1}>{label}</Typography>
            <Stack>
                <StyledListButton onMouseDown={() => { handleChange(''); }}>
                    <Typography>
                        Стандартный
                    </Typography>
                    <Typography fontWeight={700} style={{ borderBottom: `2px black solid` }}>
                        A
                    </Typography>
                </StyledListButton>
                {Object.entries(namedRainbowColors)?.map(([name, colorCode]) =>
                    <StyledListButton key={name} onMouseDown={() => {
                        handleChange(colorCode);
                    }}>
                        <Typography>
                            {name}
                        </Typography>
                        <Typography fontWeight={700} style={{ color: colorCode, borderBottom: `2px ${colorCode} solid` }}>
                            A
                        </Typography>
                    </StyledListButton>)
                }
            </Stack>
        </StyledEditColorBox>
    );
};

export default EditColorSelect;
