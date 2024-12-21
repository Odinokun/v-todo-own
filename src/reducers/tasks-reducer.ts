import { AllTasksType, TaskType } from '../App';

export type AddTaskACType = ReturnType<typeof addTaskAC>;
type ActionsType = AddTaskACType;

export const tasksReducer = (state: AllTasksType, action: ActionsType) => {
  switch (action.type) {
    case 'ADD-TASK': {
      const { todolistId, title } = action.payload;
      const newTask: TaskType = { id: crypto.randomUUID(), title, isDone: false };
      return { ...state, [todolistId]: [newTask, ...state[todolistId]] };
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
