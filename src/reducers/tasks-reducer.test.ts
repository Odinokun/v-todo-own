import { expect, test } from 'vitest';
import {
  addNewTasksAC,
  AddNewTasksACType,
  addTaskAC,
  AddTaskACType,
  changeTaskNameAC,
  ChangeTaskNameACType,
  changeTaskStatusAC,
  ChangeTaskStatusACType,
  removeTaskAC,
  RemoveTaskACType,
  tasksReducer,
} from './tasks-reducer';

const todolist_1 = crypto.randomUUID();
const todolist_2 = crypto.randomUUID();
const todolist_3 = crypto.randomUUID();

const initialState = {
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
};

test('Task must be added', () => {
  // const title = 'New task title';
  // const action: AddTaskACType = addTaskAC(todolist_1, title);
  // const endState = tasksReducer(initialState, action);
  // expect(endState[todolist_1].length).toBe(8);
  // expect(endState[todolist_1][0].title).toEqual(title);
  // expect(endState[todolist_1][0].isDone).toBe(false);
});
test('Task must be removed', () => {
  // const id = initialState[todolist_1][0].id;
  // const title = initialState[todolist_1][1].title;
  // const action: RemoveTaskACType = removeTaskAC(todolist_1, id);
  // const endState = tasksReducer(initialState, action);
  // expect(endState[todolist_1].length).toBe(6);
  // expect(endState[todolist_1][0].title).toEqual(title);
});
test('Task status must be changed', () => {
  // const id = initialState[todolist_1][0].id;
  // const action: ChangeTaskStatusACType = changeTaskStatusAC(todolist_1, id, false);
  // const endState = tasksReducer(initialState, action);
  // expect(endState[todolist_1][0].isDone).toBe(false);
});
test('Task name must be changed', () => {
  // const id = initialState[todolist_1][0].id;
  // const title = 'New task title';
  // const action: ChangeTaskNameACType = changeTaskNameAC(todolist_1, id, title);
  // const endState = tasksReducer(initialState, action);
  // expect(endState[todolist_1][0].title).toEqual(title);
});
test('New tasks must be added', () => {
  // const id = crypto.randomUUID();
  // const action: AddNewTasksACType = addNewTasksAC(id);
  // const endState = tasksReducer(initialState, action);
  // expect(endState[id].length).toBe(0);
});
