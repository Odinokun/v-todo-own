import { useState } from 'react';
import { v1 } from 'uuid';
import { Todolist } from './components/Todolist';
import './App.css';
import { AddItemForm } from './components/AddItemForm';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type AllTasksType = {
  [key: string]: TaskType[];
};

function App() {
  const todolist_1 = v1();
  const todolist_2 = v1();
  const todolist_3 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolist_1, title: 'Learning', filter: 'all' },
    { id: todolist_2, title: 'Reading', filter: 'active' },
    { id: todolist_3, title: 'Watching', filter: 'completed' },
  ]);

  const [allTasks, setAllTasks] = useState<AllTasksType>({
    [todolist_1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Rest API', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'Unit tests', isDone: true },
    ],
    [todolist_2]: [
      { id: v1(), title: 'Robinson Crusoe', isDone: true },
      { id: v1(), title: 'I am Jacky Chan', isDone: true },
      { id: v1(), title: 'The Hobbit', isDone: false },
      { id: v1(), title: 'The Silmarillion', isDone: false },
    ],
    [todolist_3]: [
      { id: v1(), title: 'The Matrix', isDone: true },
      { id: v1(), title: 'The Lord of the Rings', isDone: true },
      { id: v1(), title: 'The Godfather', isDone: false },
    ],
  });

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId));
    delete allTasks[todolistId];
  };

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

  const onChangeFilter = (todolistId: string, filter: FilterValuesType) =>
    setTodolists(todolists.map(tl => (tl.id === todolistId ? { ...tl, filter: filter } : tl)));

  const addNewTodolist = (title: string) => {
    const id = v1();
    const newTodolist: TodolistType = { id, title, filter: 'all' };
    setTodolists([newTodolist, ...todolists]);
    setAllTasks({ [id]: [], ...allTasks });
  };

  const changeTaskName = (todolistId: string, id: string, title: string) =>
    setAllTasks({
      ...allTasks,
      [todolistId]: allTasks[todolistId].map(t => (t.id === id ? { ...t, title } : t)),
    });

  const changeTodolistName = (id: string, title: string) => todolists.map(tl => (tl.id === id ? { ...tl, title } : tl));

  return (
    <div>
      <div>
        <h3>Add new Todolist</h3>
        <AddItemForm onClick={addNewTodolist} />
      </div>

      {todolists.map(tl => {
        return (
          <Todolist
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={allTasks[tl.id]}
            addTask={addTask}
            removeTask={removeTask}
            filter={tl.filter}
            onChangeFilter={onChangeFilter}
            onChangeTaskStatus={onChangeTaskStatus}
            removeTodolist={removeTodolist}
            changeTaskName={changeTaskName}
            changeTodolistName={changeTodolistName}
          />
        );
      })}
    </div>
  );
}

export default App;
