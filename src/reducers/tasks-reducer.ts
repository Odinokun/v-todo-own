import { AllTasksType, TaskType } from '../App';

export type AddTaskACType = ReturnType<typeof addTaskAC>;
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
type ActionsType = AddTaskACType | RemoveTaskACType;

export const tasksReducer = (state: AllTasksType, action: ActionsType) => {
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
    default:
      console.log('I don`t understand this action type');
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
