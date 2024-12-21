import { v1 } from 'uuid';
import { expect, test } from 'vitest';
import { FilterValuesType, TodolistType } from '../App';
import {
  addTodolistAC,
  AddTodolistACType,
  changeFilterAC,
  ChangeFilterACType,
  changeTodolistNameAC,
  ChangeTodoNameACType,
  removeTodolistAC,
  RemoveTodolistACType,
  todolistReducer,
} from './todolists-reducer';

const todolist_1 = v1();
const todolist_2 = v1();
const todolist_3 = v1();

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
  const newId = v1();
  const newTitle = 'New todolist title';
  const action: AddTodolistACType = addTodolistAC(newId, newTitle);
  const endState = todolistReducer(initialState, action);

  expect(endState.length).toBe(4);
  expect(endState[0].title).toEqual(newTitle);
  expect(endState[0].filter).toBe('all');
});
