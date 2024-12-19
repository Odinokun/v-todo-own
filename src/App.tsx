import { useReducer, useState } from 'react';
import { v1 } from 'uuid';
import { Todolist } from './components/Todolist';
import { AddItemForm } from './components/AddItemForm';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Header } from './components/Header';
import { changeFilterAC, removeTodoAC, todoReducer } from './reducers/todoReducer';

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
  const todo_1 = v1();
  const todo_2 = v1();
  const todo_3 = v1();

  // const [todolists, setTodolists] = useState<TodolistType[]>([
  //   { id: todo_1, title: 'Learning', filter: 'all' },
  //   { id: todo_2, title: 'Reading', filter: 'active' },
  //   { id: todo_3, title: 'Watching', filter: 'completed' },
  // ]);

  const [todos, dispatchTodos] = useReducer(todoReducer, [
    { id: todo_1, title: 'Learning', filter: 'all' },
    { id: todo_2, title: 'Reading', filter: 'active' },
    { id: todo_3, title: 'Watching', filter: 'completed' },
  ]);

  const [allTasks, setAllTasks] = useState<AllTasksType>({
    [todo_1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Rest API', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'Unit tests', isDone: true },
    ],
    [todo_2]: [
      { id: v1(), title: 'Robinson Crusoe', isDone: true },
      { id: v1(), title: 'I am Jacky Chan', isDone: true },
      { id: v1(), title: 'The Hobbit', isDone: false },
      { id: v1(), title: 'The Silmarillion', isDone: false },
    ],
    [todo_3]: [
      { id: v1(), title: 'The Matrix', isDone: true },
      { id: v1(), title: 'The Lord of the Rings', isDone: true },
      { id: v1(), title: 'The Godfather', isDone: false },
    ],
  });

  const removeTodo = (todolistId: string) => {
    dispatchTodos(removeTodoAC(todolistId));
    delete allTasks[todolistId];
  };

  const changeFilter = (todoId: string, filter: FilterValuesType) => {
    dispatchTodos(changeFilterAC(todoId, filter));
  };

  const changeTodoName = (id: string, title: string) => {
    // todolists.map(tl => (tl.id === id ? { ...tl, title } : tl));
  };

  // ****************************************
  // ******** #TODO NEED TO CHANGE **********
  // ****************************************

  const addTask = (todolistId: string, title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    setAllTasks({
      ...allTasks,
      [todolistId]: [newTask, ...allTasks[todolistId]],
    });
  };

  const removeTask = (todolistId: string, id: string) =>
    setAllTasks({ ...allTasks, [todolistId]: allTasks[todolistId].filter(t => t.id !== id) });

  const onChangeTaskStatus = (todolistId: string, taskId: string, status: boolean) => {
    setAllTasks({
      ...allTasks,
      [todolistId]: allTasks[todolistId].map(t => (t.id === taskId ? { ...t, isDone: status } : t)),
    });
  };

  const addNewTodolist = (title: string) => {
    const id = v1();
    const newTodolist: TodolistType = { id, title, filter: 'all' };
    // setTodolists([newTodolist, ...todolists]);
    setAllTasks({ [id]: [], ...allTasks });
  };

  const changeTaskName = (todolistId: string, id: string, title: string) =>
    setAllTasks({
      ...allTasks,
      [todolistId]: allTasks[todolistId].map(t => (t.id === id ? { ...t, title } : t)),
    });

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
                onChangeFilter={changeFilter}
                onChangeTaskStatus={onChangeTaskStatus}
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
