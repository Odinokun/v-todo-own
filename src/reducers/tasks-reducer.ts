import { AllTasksType, TaskType } from '../App';
import {
  AddNewTodolistACType,
  RemoveTodolistACType,
  todolist_1,
  todolist_2,
  todolist_3,
} from './todolists-reducer';

export type AddTaskACType = ReturnType<typeof addTaskAC>;
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskNameACType = ReturnType<typeof changeTaskNameAC>;

type ActionsType =
  | AddTaskACType
  | RemoveTaskACType
  | ChangeTaskStatusACType
  | ChangeTaskNameACType
  | AddNewTodolistACType
  | RemoveTodolistACType;

const initialState: AllTasksType = {
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

export const tasksReducer = (
  state: AllTasksType = initialState,
  action: ActionsType
): AllTasksType => {
  switch (action.type) {
    case 'ADD-TASK': {
      const { todolistId, title } = action.payload;
      const newTask: TaskType = { id: crypto.randomUUID(), title, isDone: false };
      return { ...state, [todolistId]: [newTask, ...state[todolistId]] };
    }
    case 'REMOVE-TASK': {
      const { todolistId, id } = action.payload;
      return { ...state, [todolistId]: state[todolistId].filter(t => t.id !== id) };
    }
    case 'CHANGE-TASK-STATUS': {
      const { todolistId, id, status } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].map(t => (t.id === id ? { ...t, isDone: status } : t)),
      };
    }
    case 'CHANGE-TASK-NAME': {
      const { todolistId, id, title } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].map(t => (t.id === id ? { ...t, title } : t)),
      };
    }
    case 'ADD-NEW-TODOLIST': {
      const { id } = action.payload;
      return { [id]: [], ...state };
    }
    case 'REMOVE-TODO': {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
};

export const addTaskAC = (todolistId: string, title: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      todolistId,
      title,
    },
  } as const;
};
export const removeTaskAC = (todolistId: string, id: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      todolistId,
      id,
    },
  } as const;
};
export const changeTaskStatusAC = (todolistId: string, id: string, status: boolean) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    payload: {
      todolistId,
      id,
      status,
    },
  } as const;
};
export const changeTaskNameAC = (todolistId: string, id: string, title: string) => {
  return {
    type: 'CHANGE-TASK-NAME',
    payload: {
      todolistId,
      id,
      title,
    },
  } as const;
};
