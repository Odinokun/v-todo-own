import { expect, test } from 'vitest';
import { FilterValuesType, TodolistType } from '../App';
import {
  addNewTodolistAC,
  AddNewTodolistACType,
  changeFilterAC,
  ChangeFilterACType,
  changeTodolistNameAC,
  ChangeTodoNameACType,
  removeTodolistAC,
  RemoveTodolistACType,
  todolistReducer,
} from './todolists-reducer';

const todolist_1 = crypto.randomUUID();
const todolist_2 = crypto.randomUUID();
const todolist_3 = crypto.randomUUID();

const initialState: TodolistType[] = [
  { id: todolist_1, title: 'Learning', filter: 'all' },
  { id: todolist_2, title: 'Reading', filter: 'active' },
  { id: todolist_3, title: 'Watching', filter: 'completed' },
];

test('Target todolist should be deleted', () => {
  const action: RemoveTodolistACType = removeTodolistAC(todolist_1);
  const endState = todolistReducer(initialState, action);

  expect(endState.length).toBe(2);
  expect(endState[0].id).toEqual(todolist_2);
});
test('Todolist`s filter must be worked', () => {
  const newFilter: FilterValuesType = 'completed';
  const action: ChangeFilterACType = changeFilterAC(todolist_1, newFilter);
  const endState = todolistReducer(initialState, action);

  expect(endState[0].filter).toEqual(newFilter);
});
test('Todolist`s name must be changed', () => {
  const newTitle = 'New todolist';
  const action: ChangeTodoNameACType = changeTodolistNameAC(todolist_1, newTitle);
  const finishState = todolistReducer(initialState, action);

  expect(finishState[0].title).toEqual(newTitle);
});
test('New todolist must be added', () => {
  const newId = crypto.randomUUID();
  const newTitle = 'New todolist title';
  const action: AddNewTodolistACType = addNewTodolistAC(newId, newTitle);
  const endState = todolistReducer(initialState, action);

  expect(endState.length).toBe(4);
  expect(endState[0].title).toEqual(newTitle);
  expect(endState[0].filter).toBe('all');
});
