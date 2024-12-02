import { KeyboardEvent, ChangeEvent, FC, useState } from 'react';
import { FilterValuesType, TaskType } from '../App';
import { Button } from './Button';

type PropsType = {
  todolistId: string;
  title: string;
  tasks: TaskType[];
  date?: string;
  addTask: (todolistId: string, title: string) => void;
  removeTask: (todolistId: string, id: string) => void;
  filter: FilterValuesType;
  onChangeFilter: (todolistId: string, val: FilterValuesType) => void;
  onChangeTaskStatus: (todolistId: string, taskId: string, status: boolean) => void;
};

export const Todolist: FC<PropsType> = ({
  todolistId,
  title,
  tasks,
  date,
  addTask,
  removeTask,
  filter,
  onChangeFilter,
  onChangeTaskStatus,
}) => {
  const [error, setError] = useState<string>('');
  const [inputVal, setInputVal] = useState<string>('');
  const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
    setError('');
  };

  const addTaskHandler = () => {
    if (!inputVal.trim()) {
      setError('Field is required');
      return;
    }
    addTask(todolistId, inputVal.trim());
    setInputVal('');
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskHandler();
    }
  };

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
      <h3>{title}</h3>
      <div>
        <input
          value={inputVal}
          onChange={onInputChangeHandler}
          onKeyDown={onKeyPressHandler}
          className={error ? 'error' : ''}
        />
        <span> </span>
        <Button name={'add task'} onClick={addTaskHandler} />
        {error && <div className='error-message'>{error}</div>}
      </div>
      <br />

      <div>
        <Button name={'All'} onClick={setFilterAll} className={filter === 'all' ? 'active' : ''} />
        <Button name={'Active'} onClick={setFilterActive} className={filter === 'active' ? 'active' : ''} />
        <Button name={'Completed'} onClick={setFilterCompleted} className={filter === 'completed' ? 'active' : ''} />
      </div>
      <br />

      {tasksList.length ? <ul>{tasksList}</ul> : <span>No tasks</span>}
      <br />

      <strong>
        <i>{date}</i>
      </strong>
    </div>
  );
};
