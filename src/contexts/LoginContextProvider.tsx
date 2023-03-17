import LoginContext from "./LoginContext";
import React from "react";

const LoginContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [{ id, password }, setStates] = React.useState<LoginState>({
    id: "",
    password: "",
  });
  const makeStateSetter =
    (key: keyof LoginState) => (value: LoginState[typeof key]) => {
      setStates((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

  return (
    <LoginContext.Provider
      value={{
        id,
        password,
        setId: makeStateSetter("id"),
        setPassword: makeStateSetter("password"),
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
