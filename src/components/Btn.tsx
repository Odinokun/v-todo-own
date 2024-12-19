import Button from '@mui/material/Button';
import { FC } from 'react';

type PropsType = {
  name: string;
  onClick: () => void;
  variant?: 'contained' | 'outlined' | 'text';
};

export const Btn: FC<PropsType> = ({ name, onClick, variant }) => {
  return (
    <Button variant={variant} size='small' onClick={onClick}>
      {name}
    </Button>
  );
};
