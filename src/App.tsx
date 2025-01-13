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

function App() {
  const dispatch = useDispatch();

  const todos = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);
  const allTasks = useSelector<AppRootStateType, AllTasksType>(state => state.tasks);

  const removeTodo = (todolistId: string) => dispatch(removeTodolistAC(todolistId));
  const addNewTodolist = (title: string) => dispatch(addNewTodolistAC(title));

  const changeFilter = (todolistId: string, filter: FilterValuesType) =>
    dispatch(changeFilterAC(todolistId, filter));
  const changeTodoName = (todolistId: string, title: string) =>
    dispatch(changeTodolistNameAC(todolistId, title));

  const addTask = (todolistId: string, title: string) => dispatch(addTaskAC(todolistId, title));
  const removeTask = (todolistId: string, id: string) => dispatch(removeTaskAC(todolistId, id));
  const changeTaskStatus = (todolistId: string, id: string, status: boolean) =>
    dispatch(changeTaskStatusAC(todolistId, id, status));
  const changeTaskName = (todolistId: string, id: string, title: string) =>
    dispatch(changeTaskNameAC(todolistId, id, title));

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
}

export default App;
