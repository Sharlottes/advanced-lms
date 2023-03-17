import React from "react";

import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { LoginFormContainer } from "./styled";
import GoogleIcon from "../icons/GoogleIcon";

import SubmitButton from "./SubmitButton";
import OAuthButton from "../OAuthButton";
import useLoginContext from "@/hooks/useLoginContext";

const LoginForm: React.FC = () => {
  const { setId, setPassword } = useLoginContext();

  return (
    <LoginFormContainer>
      <TextField
        onChange={(e) => setId(e.target.value)}
        variant="standard"
        placeholder="id"
      />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        variant="standard"
        placeholder="password"
        type="password"
      />
      <SubmitButton />
      <Divider>OR</Divider>
      <OAuthButton
        baseColor="#679df6"
        backgroundColor="#5491f5"
        accentColor="white"
        authType="google"
        startIcon={<GoogleIcon />}
      >
        AUTH TO GOOGLE
      </OAuthButton>
    </LoginFormContainer>
  );
};

export default LoginForm;
