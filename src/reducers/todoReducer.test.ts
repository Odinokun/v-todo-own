import { v1 } from 'uuid';
import { beforeEach, expect, test } from 'vitest';
import { FilterValuesType, TodolistType } from '../App';
import { changeFilterAC, removeTodoAC, todoReducer, changeTodoNameAC } from './todoReducer';

const todo_1 = v1();
const todo_2 = v1();
const todo_3 = v1();

const state: TodolistType[] = [
  { id: todo_1, title: 'Learning', filter: 'all' },
  { id: todo_2, title: 'Reading', filter: 'active' },
  { id: todo_3, title: 'Watching', filter: 'completed' },
];

let initialState: TodolistType[];
beforeEach(() => (initialState = state));

test('Target todolist should be delete', () => {
  const action = removeTodoAC(todo_1);

  const endState = todoReducer(initialState, action);
  expect(endState.length).toBe(2);
  expect(endState[0].id).toEqual(todo_2);
});
test('Todolist`s filter must be work', () => {
  const newFilter: FilterValuesType = 'completed';

  const action = changeFilterAC(todo_1, newFilter);
  const endState = todoReducer(initialState, action);

  expect(endState[0].filter).toEqual(newFilter);
});
test('Todolist`s name must be change', () => {
  const newTitle = 'New todolist';
  const action = changeTodoNameAC(todo_1, newTitle);

  const finishState = todoReducer(initialState, action);

  expect(finishState[0].title).toEqual(newTitle);
});
