import { beforeEach, expect, test } from 'vitest';
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

const state: TodolistType[] = [
  { id: '1', title: 'Apple', filter: 'all' },
  { id: '2', title: 'Linux', filter: 'active' },
];
let initialState: TodolistType[];
beforeEach(() => {
  initialState = state;
});

test('Target todolist should be deleted', () => {
  const action: RemoveTodolistACType = removeTodolistAC('1');
  const endState = todolistReducer(initialState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe('2');
});

test('Todolist`s filter must be worked', () => {
  const newFilter: FilterValuesType = 'completed';

  const action: ChangeFilterACType = changeFilterAC('1', newFilter);
  const endState: TodolistType[] = todolistReducer(initialState, action);

  expect(endState[0].filter).toBe('completed');
  expect(endState[1].filter).toBe('active');
});

test('Todolist`s name must be changed', () => {
  const action: ChangeTodoNameACType = changeTodolistNameAC('1', 'Windows');
  const finishState = todolistReducer(initialState, action);

  expect(finishState[0].title).toBe('Windows');
  expect(finishState[1].title).toBe('Linux');
});

test('New todolist must be added', () => {
  const action: AddNewTodolistACType = addNewTodolistAC('Windows');
  const endState = todolistReducer(initialState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].title).toEqual('Windows');
  expect(endState[0].filter).toBe('all');
});
