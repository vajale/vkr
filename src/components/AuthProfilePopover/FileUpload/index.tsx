import { StyledFileBtn } from "@/components/AuthProfilePopover/styled";
import React, { useEffect, useRef, useState } from "react";
import { MaterialIcon } from "@/assets/Icon";
import { useSetUserProfileDataMutation } from "@/api/userProfile";
import { firebaseAuth } from "@/components/FireBase";
import { CircularProgress } from "@mui/material";

const UploadIcon = ({ status }: { status: STATUS }) => {
    if (status === STATUS.success) {
        return <MaterialIcon name={"MdCheck"} />;
    }

    if (status === STATUS.error) {
        return <MaterialIcon name={"MdClose"} />;
    }

    if (status === STATUS.loading) {
        return <CircularProgress />;
    }

    return <MaterialIcon name={"MdUploadFile"} />;
};

enum STATUS {
    upload,
    error,
    success,
    loading,
}

export const FileUpload = ({ handleChangeFile }: { handleChangeFile: (file: File) => void }) => {
    const fileInputElement = useRef<null | HTMLInputElement>(null);
    const [fileName, setFileName] = useState("");
    const [fileValue, setFileValue] = useState<null | File>();

    const [uploadFile, { isLoading, isError, isSuccess, error }] = useSetUserProfileDataMutation();

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

    const handleStatusChange = (status: STATUS) => {
        setUploadStatus(status);
    };

    useEffect(() => {
        if (isLoading) {
            setUploadStatus(STATUS.loading);
            return;
        }

        if (isSuccess) {
            setUploadStatus(STATUS.success);
            return;
        }

        if (isError) {
            setUploadStatus(STATUS.error);
            return;
        }

        setUploadStatus(STATUS.upload);
    }, [isLoading, isError, isSuccess]);

    const [uploadStatus, setUploadStatus] = useState<STATUS>(STATUS.upload);

    const handleUpload = () => {
        const userId = firebaseAuth?.currentUser?.uid;
        if (userId) {
            setUploadStatus(STATUS.loading);
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
                <UploadIcon status={uploadStatus} />
            </div>
        </StyledFileBtn>
    );
};
