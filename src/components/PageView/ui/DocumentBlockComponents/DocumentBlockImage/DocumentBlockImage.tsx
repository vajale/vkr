import { StyledDocumentBlockImage } from "@/components/PageView/ui/DocumentBlockComponents/DocumentBlockImage/styled";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLazyGetDocumentImageQuery, useSetDocumentImageMutation } from "@/api/documentImage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { pageActions, selectPage } from "@/store/slices/pageSlice";
import { Button, CircularProgress, Stack } from "@mui/material";
import { type DocumentPageImageBlock } from "@/components/PageView/model/types";
import { MaterialIcon } from "@/assets/Icon";

interface IProps {
    item: DocumentPageImageBlock;
}

const DocumentBlockImage: React.FC<IProps> = ({ item }) => {
    const { src, sizes } = item;

    const dispatch = useAppDispatch();
    const [width, setWidth] = useState(sizes.width);
    const [height, setHeight] = useState(sizes.height);

    const [dragStartX, setDragStartX] = useState(null);
    const [dragStartY, setDragStartY] = useState(null);

    const handleDrag = (e) => {
        const deltaX = e.clientX - dragStartX;
        const deltaY = e.clientY - dragStartY;
        setWidth(width + deltaX);
        setHeight(height + deltaY);
        setDragStartX(e.clientX);
        setDragStartY(e.clientY);
    };

    const startDrag = (e) => {
        setDragStartX(e.clientX);
        setDragStartY(e.clientY);
        document.addEventListener("mousemove", handleDrag);
        document.addEventListener("mouseup", stopDrag);
    };

    const stopDrag = () => {
        document.removeEventListener("mousemove", handleDrag);
        document.removeEventListener("mouseup", stopDrag);
    };

    const page = useAppSelector(selectPage);
    const [getImage, { data, isLoading }] = useLazyGetDocumentImageQuery();

    useEffect(() => {
        getImage({ pageId: page?.id, imgId: src });
    }, []);

    const [uploadFile] = useSetDocumentImageMutation();

    const fileInputElement = useRef<null | HTMLInputElement>(null);

    const handleImgClick = () => {
        fileInputElement.current?.click();
    };

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const _fileName = fileInputElement.current?.value.split("\\").pop();
        const _fileValue = event?.target?.files;

        if (_fileName && _fileValue?.length) {
            await uploadFile({ file: _fileValue[0], imgId: src, pageId: page?.id ?? "" });
            await getImage({ pageId: page?.id, imgId: src });
        }
    };

    const handleInitialDrag = (e) => {
        setDragStartY(e.clientY);
        setDragStartX(e.clientX);
    };

    useEffect(() => {
        const newObj = {
            ...item,
            sizes: {
                width,
                height,
            },
        };
        dispatch(pageActions.updateBlock(newObj));
    }, [width, height]);

    const image = useMemo(() => {
        if (isLoading) {
            return <CircularProgress />;
        }

        if (data) {
            return <img className={"image"} src={data} alt={""} onClick={handleImgClick} />;
        }

        return (
            <Button className={"img-button"} onClick={handleImgClick}>
                Изображение
            </Button>
        );
    }, [isLoading, data]);

    const handleSwitchViewStyle = () => {
        dispatch(pageActions.updateBlock({
            ...item,
            simpleView: !item.simpleView
        }));
    };

    if (item.simpleView) {
        return (
            <div>
                <Button onClick={handleSwitchViewStyle}>
                    <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
                        {item.alt}
                        <MaterialIcon name={'MdEditDocument'}/>
                    </Stack>
                </Button>
            </div>
        );
    }

    return (
        <StyledDocumentBlockImage width={sizes?.width} height={sizes?.height}>
            <div className="resizable-box" style={{ width: sizes.width, height: sizes.height }}>
                {image}
                <div
                    className="handle right"
                    onMouseDown={startDrag}
                    onMouseEnter={handleInitialDrag}
                />
            </div>
             <input
                className={"file-input"}
                type="file"
                ref={fileInputElement}
                accept="image/png"
                onChange={async (event) => {
                    await handleChange(event);
                }}
             />
        </StyledDocumentBlockImage>
    );
};

export default DocumentBlockImage;
