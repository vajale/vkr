import { StyledFileBtn } from "@/components/AuthProfilePopover/styled";
import React, { useRef, useState } from "react";
import { MaterialIcon } from "@/assets/Icon";
import { useSetUserProfileDataMutation } from "@/api/userProfile";
import { firebaseAuth } from "@/components/FireBase";

export const FileUpload = ({ handleChangeFile }: { handleChangeFile: (file: File) => void }) => {
    const fileInputElement = useRef<null | HTMLInputElement>(null);
    const [fileName, setFileName] = useState("");
    const [fileValue, setFileValue] = useState<null | File>();

    const [uploadFile] = useSetUserProfileDataMutation();

    const openFilePicker = () => {
        fileInputElement.current?.click();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const _fileName = fileInputElement.current?.value.split("\\").pop();
        const _fileValue = event?.target?.files;

        if (_fileName && _fileValue?.length) {
            setFileName(_fileName ?? "");
            setFileValue(_fileValue[0]);
            handleChangeFile(_fileValue[0]);
        }
    };

    const handleUpload = () => {
        const userId = firebaseAuth?.currentUser?.uid;
        if (userId) {
            uploadFile({ file: fileValue, userId });
        }
    };

    return (
        <StyledFileBtn className="file-wrapper">
            <span className="input-file-text">{fileName}</span>
            <input
                type="file"
                name="file"
                id="fileInput"
                onChange={handleChange}
                ref={fileInputElement}
            />
            <span className="input-file-btn" onClick={openFilePicker}>
                файл
            </span>
            <div className={"upload-icon"} onClick={handleUpload}>
                <MaterialIcon name={"MdUploadFile"} />
            </div>
        </StyledFileBtn>
    );
};
