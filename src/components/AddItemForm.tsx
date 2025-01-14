import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { Btn } from './Btn';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type PropsType = {
  onClick: (title: string) => void;
};

export const AddItemForm: FC<PropsType> = React.memo(({ onClick }) => {
  console.log('ADD_ITEM_FORM');
  const [error, setError] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>('');

  const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
    if (error) {
      setError(false);
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickHandler();
    }
  };

  const onClickHandler = () => {
    if (!inputVal.trim()) {
      setError(true);
      return;
    }
    onClick(inputVal.trim());
    setInputVal('');
  };

  return (
    <Box display='flex' alignItems='center' mb={2}>
      <TextField
        variant='outlined'
        size='small'
        label={!error ? 'Type your text...' : 'This field is required'}
        error={error}
        value={inputVal}
        onChange={onInputChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? 'error' : ''}
        sx={{ mr: 0.5 }}
      />
      <Btn variant='contained' name={'add task'} onClick={onClickHandler} />
    </Box>
  );
});
