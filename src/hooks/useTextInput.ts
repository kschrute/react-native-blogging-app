import { useState } from 'react';

type Returns = [string, { value: string; onChangeText: (v: string) => void }];

export const useTextInput = (initialValue = ''): Returns => {
  const [value, setValue] = useState(initialValue);
  const props = {
    value,
    onChangeText: (v: string) => setValue(v),
  };
  return [value, props];
};
