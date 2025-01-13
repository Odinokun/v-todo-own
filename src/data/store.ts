import { combineReducers, createStore } from 'redux';
import { todolistReducer } from '../reducers/todolists-reducer';
import { tasksReducer } from '../reducers/tasks-reducer';

export type AppRootStateType = ReturnType<typeof rootStore>;

const rootStore = combineReducers({
  todolists: todolistReducer,
  tasks: tasksReducer,
});

export const store = createStore(rootStore);
