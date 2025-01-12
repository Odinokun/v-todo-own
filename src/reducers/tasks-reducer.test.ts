import { beforeEach, expect, test } from 'vitest';
import {
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
import { AllTasksType } from '../App';
import {
  addNewTodolistAC,
  AddNewTodolistACType,
  removeTodolistAC,
  RemoveTodolistACType,
} from './todolists-reducer';

const todolist_1 = crypto.randomUUID();
const todolist_2 = crypto.randomUUID();

const state: AllTasksType = {
  [todolist_1]: [
    { id: '1', title: 'Apple', isDone: true },
    { id: '2', title: 'Linux', isDone: false },
  ],
  [todolist_2]: [
    { id: '1', title: 'Audi', isDone: true },
    { id: '2', title: 'BMW', isDone: false },
  ],
};
let initialState: AllTasksType;
beforeEach(() => {
  initialState = state;
});

test('Task must be added', () => {
  const action: AddTaskACType = addTaskAC(todolist_1, 'Windows');
  const endState = tasksReducer(initialState, action);
  expect(endState[todolist_1].length).toBe(3);
  expect(endState[todolist_1][0].title).toBe('Windows');
  expect(endState[todolist_2][0].title).toBe('Audi');
  expect(endState[todolist_1][0].isDone).toBe(false);
});

test('Task must be removed', () => {
  const action: RemoveTaskACType = removeTaskAC(todolist_1, '1');
  const endState = tasksReducer(initialState, action);

  expect(endState[todolist_1].length).toBe(1);
  expect(endState[todolist_2].length).toBe(2);
  expect(endState[todolist_1].every(el => el.id !== '1')).toBeTruthy();
});

test('Task status must be changed', () => {
  const action: ChangeTaskStatusACType = changeTaskStatusAC(todolist_1, '1', false);
  const endState = tasksReducer(initialState, action);

  expect(endState[todolist_1][0].isDone).toBe(false);
  expect(endState[todolist_2][0].isDone).toBe(true);
});

test('Task name must be changed', () => {
  const action: ChangeTaskNameACType = changeTaskNameAC(todolist_1, '1', 'Windows');
  const endState = tasksReducer(initialState, action);

  expect(endState[todolist_1][0].title).toBe('Windows');
  expect(endState[todolist_2][0].title).toBe('Audi');
});

test('New key with tasks array must be added when new todolist was added', () => {
  const action: AddNewTodolistACType = addNewTodolistAC('Title does`t matter');
  const endState: AllTasksType = tasksReducer(initialState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== todolist_1 && k !== todolist_2);
  if (!newKey) {
    throw Error('New key must be added!');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('Key and task`s array must be deleted when we deleting todolist', () => {
  const action: RemoveTodolistACType = removeTodolistAC(todolist_1);
  const endState: AllTasksType = tasksReducer(initialState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[todolist_1]).toBeUndefined();
});
