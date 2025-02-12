import React, { ChangeEvent, FC, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

type PropsType = {
  title: string;
  callbackValue: (title: string) => void;
};

export const EditableSpan: FC<PropsType> = React.memo(({ title, callbackValue }) => {
  const [inputVal, setInputVal] = useState<string>(title);
  const [editMode, setEditMode] = useState<boolean>(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  const callbackValueHandler = () => {
    if (inputVal.trim()) {
      callbackValue(inputVal.trim());
      setEditMode(false);
    } else {
      alert('The name can`t be empty!');
    }
  };

  const onEdit = () => {
    setEditMode(true);
  };

  return (
    <>
      {editMode ? (
        <TextField
          variant='outlined'
          size='small'
          value={inputVal}
          onChange={onInputChange}
          onBlur={callbackValueHandler}
          autoFocus
        />
      ) : (
        <Typography variant='inherit' component='span' onDoubleClick={onEdit}>
          {inputVal}
        </Typography>
      )}
    </>
  );
});
