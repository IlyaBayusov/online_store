import { useEffect, useState } from "react";

export const useValidation = (value: string, valids: object) => {
  const [empty, setEmpty] = useState(true);
  const [minLength, setMinLength] = useState(false);
  const [maxLength, setMaxLength] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const valid in valids) {
      switch (valid) {
        case "minLength":
          value.length < valids[valid]
            ? setMinLength(true)
            : setMinLength(false);
          break;
        case "maxLength":
          value.length > valids[valid]
            ? setMaxLength(true)
            : setMaxLength(false);
          break;
        case "empty":
          value ? setEmpty(false) : setEmpty(true);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (empty || minLength || maxLength) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [empty, minLength, maxLength]);

  return {
    empty,
    minLength,
    maxLength,
    inputValid,
  };
};
