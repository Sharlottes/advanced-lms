import useStateSetter from "./useStateSetter";

const useLoginForm = () =>
  useStateSetter<LoginState>({
    id: "",
    password: "",
  });

export default useLoginForm;
