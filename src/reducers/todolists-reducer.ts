import { FilterValuesType, TodolistType } from '../App';

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;
export type ChangeFilterACType = ReturnType<typeof changeFilterAC>;
export type ChangeTodoNameACType = ReturnType<typeof changeTodolistNameAC>;
export type AddTodolistACType = ReturnType<typeof addTodolistAC>;

type ActionsType = RemoveTodolistACType | ChangeFilterACType | ChangeTodoNameACType | AddTodolistACType;

export const todolistReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODO': {
      const { id } = action.payload;
      return state.filter(tl => tl.id !== id);
    }
    case 'CHANGE-FILTER': {
      const { id, filter } = action.payload;
      return state.map(tl => (tl.id === id ? { ...tl, filter } : tl));
    }
    case 'CHANGE-TODOLIST-NAME': {
      const { id, title } = action.payload;
      return state.map(tl => (tl.id === id ? { ...tl, title } : tl));
    }
    case 'ADD-TODOLIST': {
      const { id, title } = action.payload;
      const newTodolist: TodolistType = { id, title, filter: 'all' };
      return [newTodolist, ...state];
    }
    default:
      throw new Error("I don't understand this action type");
  }
};

export const removeTodolistAC = (id: string) => {
  return {
    type: 'REMOVE-TODO',
    payload: { id },
  } as const;
};
export const changeFilterAC = (id: string, filter: FilterValuesType) => {
  return {
    type: 'CHANGE-FILTER',
    payload: {
      id,
      filter,
    },
  } as const;
};
export const changeTodolistNameAC = (id: string, title: string) => {
  return {
    type: 'CHANGE-TODOLIST-NAME',
    payload: {
      id,
      title,
    },
  } as const;
};
export const addTodolistAC = (id: string, title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      id,
      title,
    },
  } as const;
};
