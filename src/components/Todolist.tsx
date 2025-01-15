import React, { FC, useCallback } from 'react';

import { FilterValuesType, TaskType } from '../App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Btn } from './Btn';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';

import { Task } from './Task';

type PropsType = {
  todolistId: string;
  title: string;
  tasks: TaskType[];
  addTask: (todolistId: string, title: string) => void;
  removeTask: (todolistId: string, id: string) => void;
  filter: FilterValuesType;
  changeFilter: (todolistId: string, val: FilterValuesType) => void;
  changeTaskStatus: (todolistId: string, id: string, status: boolean) => void;
  removeTodolist: (todolistId: string) => void;
  changeTaskName: (todolistId: string, id: string, title: string) => void;
  changeTodolistName: (id: string, title: string) => void;
};

export const Todolist: FC<PropsType> = React.memo(
  ({
    todolistId,
    title,
    tasks,
    addTask,
    removeTask,
    filter,
    changeFilter,
    changeTaskStatus,
    removeTodolist,
    changeTaskName,
    changeTodolistName,
  }) => {
    const removeTodolistHandler = () => removeTodolist(todolistId);
    const addTaskHandler = useCallback(
      (title: string) => addTask(todolistId, title),
      [addTask, todolistId]
    );

    // begin filter
    function tasksFilter(): TaskType[] {
      switch (filter) {
        case 'active':
          return tasks.filter(t => !t.isDone);
        case 'completed':
          return tasks.filter(t => t.isDone);
        default:
          return tasks;
      }
    }
    const filteredTasksArr = tasksFilter();
    const setFilterAll = useCallback(
      () => changeFilter(todolistId, 'all'),
      [changeFilter, todolistId]
    );
    const setFilterActive = useCallback(
      () => changeFilter(todolistId, 'active'),
      [changeFilter, todolistId]
    );
    const setFilterCompleted = useCallback(
      () => changeFilter(todolistId, 'completed'),
      [changeFilter, todolistId]
    );
    // end filter

    const changeTodolistNameHandler = (title: string) => changeTodolistName(todolistId, title);

    const tasksList: JSX.Element[] = filteredTasksArr.map(t => (
      <Task
        key={t.id}
        todolistId={todolistId}
        task={t}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
        changeTaskName={changeTaskName}
      />
    ));

    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h6' component='h2' mb={1}>
            <EditableSpan callbackValue={changeTodolistNameHandler} title={title} />
          </Typography>
          <IconButton size='small' color='error' onClick={removeTodolistHandler}>
            <DeleteIcon />
          </IconButton>
        </Box>

        <AddItemForm onClick={addTaskHandler} />

        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Btn
            name={'All'}
            onClick={setFilterAll}
            variant={filter === 'all' ? 'contained' : 'outlined'}
          />
          <Btn
            name={'Active'}
            onClick={setFilterActive}
            variant={filter === 'active' ? 'contained' : 'outlined'}
          />
          <Btn
            name={'Completed'}
            onClick={setFilterCompleted}
            variant={filter === 'completed' ? 'contained' : 'outlined'}
          />
        </Box>
        {tasksList.length ? (
          <List>{tasksList}</List>
        ) : (
          <Typography variant='h6' component='span'>
            You have no tasks yet =(
          </Typography>
        )}
      </Paper>
    );
  }
);
