import { type Task } from "@/components/PageView/model/types";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { MaterialIcon } from "@/assets/Icon";
import { useAppDispatch } from "@/store/hooks";
import { calendarActions } from "@/store/slices/calendarSlice";
import { getBackground } from "@/utils/mock/mockdata";
import { formatDateString } from "@/utils/helper/helpers";
import { motion } from "framer-motion";

interface TaskProps {
    task: Task
}

const CalendarCellTask = (props: TaskProps) => {
    const { task } = props;

    const dispatch = useAppDispatch();

    const handleRemoveTask = () => {
        dispatch(calendarActions.removeTask(task));
    };

    const taskDate = useMemo(() => formatDateString(task.date), [task]);

    return (
        <motion.div initial={{ scale: 0 }}
                    animate={{ scale: 1 }}>
            <Stack sx={{
                backgroundColor: getBackground(task.priority),
                borderRadius: 1,
                zIndex: 10,
                width: 140,
                maxHeight: 50,
                position: 'relative',
            }} padding={1} gap={1}
                   flexDirection={'row'}>
                <Stack alignItems={'flex-start'}>
                    <Typography sx={{ wordBreak: 'break-word', width: 110 }} overflow={'clip'} gutterBottom>
                        {task.content}
                    </Typography>
                    <Box fontSize={14} borderRadius={1} p={0.5}
                         sx={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                        {taskDate}
                    </Box>
                </Stack>
                <Button style={{ width: 20, position: 'absolute', minWidth: 24, maxWidth: 24, right: 7 }} size={'small'}
                        onClick={handleRemoveTask}>
                    <MaterialIcon name={"MdDeleteOutline"}/>
                </Button>
            </Stack>
        </motion.div>
    );
};

export default CalendarCellTask;
