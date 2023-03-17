import React from "react";

const useStateSetter = <T>(
  defaultState: T
): [T, (key: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [states, setStates] = React.useState<T>(defaultState);
  const makeStateSetter =
    (key: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setStates((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  return [states, makeStateSetter];
};

export default useStateSetter;
