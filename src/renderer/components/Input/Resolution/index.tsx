import React, { ChangeEvent } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FiMonitor } from 'react-icons/fi';

import { InputStyled } from '../styles';
import { Container } from './styles';

type Resolution = {
  width: number;
  height: number;
};

type InputResolutionProps = {
  resolution: Resolution;
  onChange: (resolution: Resolution) => void;
};

export const InputResolution: React.FC<InputResolutionProps> = ({
  resolution,
  onChange,
}) => {
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(target.value);
    const name = target.name;

    onChange({ ...resolution, [name]: isNaN(value) ? 0 : value });
  };

  return (
    <Container>
      <FiMonitor />
      <InputStyled
        placeholder="<Automática>"
        value={resolution.width != 0 ? resolution.width : ''}
        name="width"
        onChange={handleChange}
      />
      <AiOutlineClose />
      <InputStyled
        placeholder="<Automática>"
        value={resolution.height != 0 ? resolution.height : ''}
        name="height"
        onChange={handleChange}
      />
    </Container>
  );
};
