import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  addNewTodolistAC,
  changeFilterAC,
  changeTodolistNameAC,
  removeTodolistAC,
} from './reducers/todolists-reducer';
import {
  addTaskAC,
  changeTaskNameAC,
  changeTaskStatusAC,
  removeTaskAC,
} from './reducers/tasks-reducer';

import { AppRootStateType } from './data/store';

import { Todolist } from './components/Todolist';
import { AddItemForm } from './components/AddItemForm';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Header } from './components/Header';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type AllTasksType = {
  [key: string]: TaskType[];
};

const App = React.memo(() => {
  console.log('APP');
  const dispatch = useDispatch();

  const todos = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);
  const allTasks = useSelector<AppRootStateType, AllTasksType>(state => state.tasks);

  const removeTodo = useCallback(
    (todolistId: string) => dispatch(removeTodolistAC(todolistId)),
    [dispatch]
  );
  const addNewTodolist = useCallback(
    (title: string) => dispatch(addNewTodolistAC(title)),
    [dispatch]
  );
  const changeFilter = useCallback(
    (todolistId: string, filter: FilterValuesType) => dispatch(changeFilterAC(todolistId, filter)),
    [dispatch]
  );
  const changeTodoName = useCallback(
    (todolistId: string, title: string) => dispatch(changeTodolistNameAC(todolistId, title)),
    [dispatch]
  );
  const addTask = useCallback(
    (todolistId: string, title: string) => dispatch(addTaskAC(todolistId, title)),
    [dispatch]
  );
  const removeTask = useCallback(
    (todolistId: string, id: string) => dispatch(removeTaskAC(todolistId, id)),
    [dispatch]
  );
  const changeTaskStatus = useCallback(
    (todolistId: string, id: string, status: boolean) =>
      dispatch(changeTaskStatusAC(todolistId, id, status)),
    [dispatch]
  );
  const changeTaskName = useCallback(
    (todolistId: string, id: string, title: string) =>
      dispatch(changeTaskNameAC(todolistId, id, title)),
    [dispatch]
  );

  return (
    <Box>
      <Header />
      <Container>
        <Box sx={{ py: 3 }}>
          <Typography variant='h6' component='h2' mb={1}>
            Add new Todolist
          </Typography>
          <AddItemForm onClick={addNewTodolist} />
        </Box>
      </Container>

      <Container>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
          {todos.map(tl => {
            return (
              <Todolist
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                tasks={allTasks[tl.id]}
                addTask={addTask}
                removeTask={removeTask}
                filter={tl.filter}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodo}
                changeTaskName={changeTaskName}
                changeTodolistName={changeTodoName}
              />
            );
          })}
        </Box>
      </Container>
    </Box>
  );
});

export default App;
