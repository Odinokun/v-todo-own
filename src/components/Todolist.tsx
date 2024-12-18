import { ChangeEvent, FC } from 'react';
import { FilterValuesType, TaskType } from '../App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Btn } from './Btn';

type PropsType = {
  todolistId: string;
  title: string;
  tasks: TaskType[];
  addTask: (todolistId: string, title: string) => void;
  removeTask: (todolistId: string, id: string) => void;
  filter: FilterValuesType;
  onChangeFilter: (todolistId: string, val: FilterValuesType) => void;
  onChangeTaskStatus: (todolistId: string, taskId: string, status: boolean) => void;
  removeTodolist: (todolistId: string) => void;
  changeTaskName: (todolistId: string, id: string, title: string) => void;
  changeTodolistName: (id: string, title: string) => void;
};

export const Todolist: FC<PropsType> = ({
  todolistId,
  title,
  tasks,
  addTask,
  removeTask,
  filter,
  onChangeFilter,
  onChangeTaskStatus,
  removeTodolist,
  changeTaskName,
  changeTodolistName,
}) => {
  const removeTodolistHandler = () => removeTodolist(todolistId);
  const addTaskHandler = (title: string) => addTask(todolistId, title);

  // begin filter
  function tasksFilter(): TaskType[] {
    switch (filter) {
      case 'active':
        return tasks.filter(t => !t.isDone);
      case 'completed':
        return tasks.filter(t => t.isDone);
      default:
        return tasks;
    }
  }
  const filteredTasksArr = tasksFilter();
  const setFilterAll = () => onChangeFilter(todolistId, 'all');
  const setFilterActive = () => onChangeFilter(todolistId, 'active');
  const setFilterCompleted = () => onChangeFilter(todolistId, 'completed');
  // end filter

  const changeTodolistNameHandler = (title: string) => changeTodolistName(todolistId, title);

  const tasksList: JSX.Element[] = filteredTasksArr.map(t => {
    const onClickHandler = () => removeTask(todolistId, t.id);
    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
      onChangeTaskStatus(todolistId, t.id, e.currentTarget.checked);
    const changeTaskNameHandler = (title: string) => {
      changeTaskName(todolistId, t.id, title);
    };

    return (
      <li key={t.id}>
        <Btn name={'del'} onClick={onClickHandler} />
        <input type='checkbox' checked={t.isDone} onChange={onChangeTaskStatusHandler} />
        <EditableSpan title={t.title} callbackValue={changeTaskNameHandler} />
      </li>
    );
  });

  return (
    <div>
      <div>
        <h3>
          <EditableSpan callbackValue={changeTodolistNameHandler} title={title} />
        </h3>
        <Btn name='del' onClick={removeTodolistHandler} />
      </div>

      <AddItemForm onClick={addTaskHandler} />

      <div>
        <Btn name={'All'} onClick={setFilterAll} className={filter === 'all' ? 'active' : ''} />
        <Btn name={'Active'} onClick={setFilterActive} className={filter === 'active' ? 'active' : ''} />
        <Btn name={'Completed'} onClick={setFilterCompleted} className={filter === 'completed' ? 'active' : ''} />
      </div>
      {tasksList.length ? <ul>{tasksList}</ul> : <span>No tasks</span>}
    </div>
  );
};
