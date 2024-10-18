import { ChangeEvent, useState } from "react";
import { useValidation } from "./useValidations";

export const useInput = (initValue: string, valids: object) => {
  const [value, setValue] = useState(initValue);
  const [dirty, setDirty] = useState(false);
  const valid = useValidation(value, valids);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    setDirty(true);
  };

  return { value, onChange, onBlur, dirty, ...valid };
};
