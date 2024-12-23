import { expect, test } from 'vitest';
import { AllTasksType, TodolistType } from '../App';
import { tasksReducer } from './tasks-reducer';
import { addNewTodolistAC, AddNewTodolistACType, todolistReducer } from './todolists-reducer';

test('Id new todolist & id new tasks must be equal', () => {
  const initialTasksState: AllTasksType = {};
  const initialTodolistsState: TodolistType[] = [];

  const action: AddNewTodolistACType = addNewTodolistAC('New todolist title');
  const endTasksState: AllTasksType = tasksReducer(initialTasksState, action);
  const endTodolistsState: TodolistType[] = todolistReducer(initialTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.id);
  expect(idFromTodolists).toBe(action.payload.id);
});
