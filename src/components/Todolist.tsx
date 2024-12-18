import { ChangeEvent, FC } from 'react';
import { FilterValuesType, TaskType } from '../App';
import { Button } from './Button';
import { AddItemForm } from './AddItemForm';

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

  const tasksList: JSX.Element[] = filteredTasksArr.map(t => {
    const onClickHandler = () => removeTask(todolistId, t.id);
    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
      onChangeTaskStatus(todolistId, t.id, e.currentTarget.checked);

    return (
      <li key={t.id}>
        <Button name={'del'} onClick={onClickHandler} />
        <input type='checkbox' checked={t.isDone} onChange={onChangeTaskStatusHandler} />
        <span>{t.title}</span>
      </li>
    );
  });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ marginRight: '5px' }}>{title}</h3>
        <Button name='del' onClick={removeTodolistHandler} />
      </div>

      <AddItemForm onClick={addTaskHandler} />

      <div>
        <Button name={'All'} onClick={setFilterAll} className={filter === 'all' ? 'active' : ''} />
        <Button name={'Active'} onClick={setFilterActive} className={filter === 'active' ? 'active' : ''} />
        <Button name={'Completed'} onClick={setFilterCompleted} className={filter === 'completed' ? 'active' : ''} />
      </div>
      {tasksList.length ? <ul>{tasksList}</ul> : <span>No tasks</span>}
    </div>
  );
};
