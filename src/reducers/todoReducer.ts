import { FilterValuesType, TodolistType } from '../App';

type RemoveIdACType = ReturnType<typeof removeTodoAC>;
type ChangeFilterACType = ReturnType<typeof changeFilterAC>;

type ActionsType = RemoveIdACType | ChangeFilterACType;

export const todoReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODO':
      return state.filter(tl => tl.id !== action.payload.todoId);
    case 'CHANGE-FILTER':
      return state.map(tl => (tl.id === action.payload.todoId ? { ...tl, filter: action.payload.filter } : tl));
    default:
      throw new Error("I don't understand this action type");
  }
};

export const removeTodoAC = (todoId: string) => {
  return {
    type: 'REMOVE-TODO',
    payload: {
      todoId,
    },
  } as const;
};
export const changeFilterAC = (todoId: string, filter: FilterValuesType) => {
  return {
    type: 'CHANGE-FILTER',
    payload: {
      todoId,
      filter,
    },
  } as const;
};
// export const changeTodoName = ()
