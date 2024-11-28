import { KeyboardEvent, ChangeEvent, FC, useState } from 'react';
import { FilterValuesType, TaskType } from '../App';
import { Button } from './Button';

type PropsType = {
  title: string;
  tasks: TaskType[];
  date?: string;
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
  setFilter: (val: FilterValuesType) => void;
  onChangeTaskStatus: (taskId: string, status: boolean) => void;
};

export const Todolist: FC<PropsType> = ({
  title,
  tasks,
  date,
  addTask,
  removeTask,
  setFilter,
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
    addTask(inputVal.trim());
    setInputVal('');
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskHandler();
    }
  };

  const setFilterAll = () => setFilter('all');
  const setFilterActive = () => setFilter('active');
  const setFilterCompleted = () => setFilter('completed');

  const tasksList: JSX.Element[] = tasks.map(t => {
    const onClickHandler = () => removeTask(t.id);
    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
      onChangeTaskStatus(t.id, e.currentTarget.checked);

    return (
      <li key={t.id}>
        <Button name={'del'} onClick={onClickHandler} />
        <input
          type='checkbox'
          checked={t.isDone}
          onChange={onChangeTaskStatusHandler}
        />
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
        <Button name={'All'} onClick={setFilterAll} />
        <Button name={'Active'} onClick={setFilterActive} />
        <Button name={'Completed'} onClick={setFilterCompleted} />
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
