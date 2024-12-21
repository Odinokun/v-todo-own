import { useReducer } from 'react';
import { Todolist } from './components/Todolist';
import { AddItemForm } from './components/AddItemForm';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Header } from './components/Header';
import {
  addNewTodolistAC,
  changeFilterAC,
  changeTodolistNameAC,
  removeTodolistAC,
  todolistReducer,
} from './reducers/todolists-reducer';
import {
  addNewTasksAC,
  addTaskAC,
  changeTaskNameAC,
  changeTaskStatusAC,
  removeTaskAC,
  tasksReducer,
} from './reducers/tasks-reducer';

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
  const todolist_1 = crypto.randomUUID();
  const todolist_2 = crypto.randomUUID();
  const todolist_3 = crypto.randomUUID();

  const [todos, dispatchTodolists] = useReducer(todolistReducer, [
    { id: todolist_1, title: 'Learning', filter: 'all' },
    { id: todolist_2, title: 'Reading', filter: 'active' },
    { id: todolist_3, title: 'Watching', filter: 'completed' },
  ]);
  const [allTasks, dispatchTasks] = useReducer(tasksReducer, {
    [todolist_1]: [
      { id: crypto.randomUUID(), title: 'HTML&CSS', isDone: true },
      { id: crypto.randomUUID(), title: 'JS', isDone: true },
      { id: crypto.randomUUID(), title: 'React', isDone: false },
      { id: crypto.randomUUID(), title: 'Rest API', isDone: false },
      { id: crypto.randomUUID(), title: 'GraphQL', isDone: false },
      { id: crypto.randomUUID(), title: 'Redux', isDone: false },
      { id: crypto.randomUUID(), title: 'Unit tests', isDone: true },
    ],
    [todolist_2]: [
      { id: crypto.randomUUID(), title: 'Robinson Crusoe', isDone: true },
      { id: crypto.randomUUID(), title: 'I am Jacky Chan', isDone: true },
      { id: crypto.randomUUID(), title: 'The Hobbit', isDone: false },
      { id: crypto.randomUUID(), title: 'The Silmarillion', isDone: false },
    ],
    [todolist_3]: [
      { id: crypto.randomUUID(), title: 'The Matrix', isDone: true },
      { id: crypto.randomUUID(), title: 'The Lord of the Rings', isDone: true },
      { id: crypto.randomUUID(), title: 'The Godfather', isDone: false },
    ],
  });

  const removeTodo = (todolistId: string) => {
    dispatchTodolists(removeTodolistAC(todolistId));
    delete allTasks[todolistId];
  };
  const changeFilter = (todolistId: string, filter: FilterValuesType) =>
    dispatchTodolists(changeFilterAC(todolistId, filter));
  const changeTodoName = (todolistId: string, title: string) =>
    dispatchTodolists(changeTodolistNameAC(todolistId, title));

  const addTask = (todolistId: string, title: string) => dispatchTasks(addTaskAC(todolistId, title));
  const removeTask = (todolistId: string, id: string) => dispatchTasks(removeTaskAC(todolistId, id));
  const changeTaskStatus = (todolistId: string, id: string, status: boolean) =>
    dispatchTasks(changeTaskStatusAC(todolistId, id, status));
  const changeTaskName = (todolistId: string, id: string, title: string) =>
    dispatchTasks(changeTaskNameAC(todolistId, id, title));

  const addNewTodolist = (title: string) => {
    const id = crypto.randomUUID();
    dispatchTodolists(addNewTodolistAC(id, title));
    dispatchTasks(addNewTasksAC(id));
  };

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
