import React, { FC } from 'react';
import Button from '@mui/material/Button';

type PropsType = {
  name: string;
  onClick: () => void;
  variant?: 'contained' | 'outlined' | 'text';
};

export const Btn: FC<PropsType> = React.memo(({ name, onClick, variant }) => {
  console.log('BUTTON');
  return (
    <Button variant={variant} size='small' onClick={onClick}>
      {name}
    </Button>
  );
});
