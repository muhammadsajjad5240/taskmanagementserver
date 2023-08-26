import { Transform } from 'class-transformer';

export const ToBoolean = () =>
  Transform(
    ({ value }) =>
      value === 'true' || value === '1' || value === 1 || value === true,
  );

export const ToNumber = () => Transform(({ value }) => Number(value));
