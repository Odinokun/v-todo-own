import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { Button } from './Button';

type PropsType = {
  onClick: (title: string) => void;
};

export const AddItemForm: FC<PropsType> = ({ onClick }) => {
  const [error, setError] = useState<string>('');
  const [inputVal, setInputVal] = useState<string>('');

  const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
    setError('');
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickHandler();
    }
  };

  const onClickHandler = () => {
    if (!inputVal.trim()) {
      setError('Field is required');
      return;
    }
    onClick(inputVal.trim());
    setInputVal('');
  };

  return (
    <div>
      <input
        value={inputVal}
        onChange={onInputChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? 'error' : ''}
      />
      <Button name={'add task'} onClick={onClickHandler} />
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
};
