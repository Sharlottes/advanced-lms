import createContext, { field } from "@/utils/createContext";

const LoginContext = createContext(field("id")(""), field("password")(""));

export default LoginContext;
