import { Button, Stack, Typography } from "@mui/material";
import { MaterialIcon } from "@/assets/Icon";
import React from "react";

const CreateTaskButton = () => {
    return (
        <Button>
            <Stack width={'100%'} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-start'}>
                <MaterialIcon name={'MdAdd'}/>
                <Typography marginLeft={1}>Создать задачу</Typography>
            </Stack>
        </Button>
    );
};

export default CreateTaskButton;
