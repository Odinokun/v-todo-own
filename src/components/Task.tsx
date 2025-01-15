import React, { ChangeEvent, FC, useCallback } from 'react';
import { TaskType } from '../App';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CheckBox from '@mui/material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditableSpan } from './EditableSpan';

type PropsType = {
  todolistId: string;
  task: TaskType;
  removeTask: (todolistId: string, id: string) => void;
  changeTaskStatus: (todolistId: string, id: string, status: boolean) => void;
  changeTaskName: (todolistId: string, id: string, title: string) => void;
};

export const Task: FC<PropsType> = React.memo(
  ({ todolistId, task, removeTask, changeTaskStatus, changeTaskName }) => {
    const onClickHandler = () => removeTask(todolistId, task.id);
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
      changeTaskStatus(todolistId, task.id, e.currentTarget.checked);
    const changeTaskNameHandler = useCallback(
      (title: string) => {
        changeTaskName(todolistId, task.id, title);
      },
      [changeTaskName, todolistId, task.id]
    );

    return (
      <ListItem disableGutters disablePadding sx={{ opacity: task.isDone ? 0.5 : 1 }}>
        <CheckBox checked={task.isDone} onChange={changeTaskStatusHandler} />
        <Typography variant='body1' component='span' sx={{ flexGrow: 1 }}>
          <EditableSpan title={task.title} callbackValue={changeTaskNameHandler} />
        </Typography>
        <IconButton size='small' color='error' onClick={onClickHandler}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    );
  }
);
