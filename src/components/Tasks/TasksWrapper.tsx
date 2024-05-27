import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { MaterialIcon } from "@/assets/Icon";
import DndTaskWrapper from "./DndTaskWrapper";
import { mocktasks } from "@/utils/mock/mockdata";

const TasksWrapper = () => {
    return (
        <Paper sx={{ width: '98%', margin: 1, height: '90%' }}>
            <Stack mt={2} mb={2} flexDirection={'row'} alignItems={'center'}>
                <Typography ml={3} mr={1} mb={1} variant={'h5'}>
                    Задачи
                </Typography>
                <MaterialIcon name={'MdFavoriteBorder'}/>
            </Stack>
             <Box height={'90%'} sx={{ backgroundColor: 'whitesmoke' }} margin={1} borderRadius={1}>
                <Grid container spacing={3} gap={1} padding={5}>
                    <Grid xs>
                        <DndTaskWrapper items={mocktasks} label={'Сделать'}/>
                    </Grid>
                    <Grid xs>
                        <DndTaskWrapper items={mocktasks} label={'Делается'}/>
                    </Grid>
                    <Grid xs>
                        <DndTaskWrapper items={mocktasks} label={'Сделано'}/>
                    </Grid>
                    <Grid xs>
                        <DndTaskWrapper items={mocktasks} label={'Проблемы'}/>
                    </Grid>
                </Grid>
             </Box>
        </Paper>
    );
};

export default TasksWrapper;
