import React from "react";
import LoginContext from "@/contexts/LoginContext";

const useLoginContext = () => React.useContext(LoginContext);
export default useLoginContext;
