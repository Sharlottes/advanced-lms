import React from "react";

import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { LoginFormContainer } from "./styled";
import GoogleIcon from "../icons/GoogleIcon";

import useLoginForm from "@/hooks/useLoginForm";
import SubmitButton from "./SubmitButton";
import OAuthButton from "../OAuthButton";

const LoginForm: React.FC = () => {
  const [, makeStateSetter] = useLoginForm();

  return (
    <LoginFormContainer>
      <TextField
        onChange={makeStateSetter("id")}
        variant="standard"
        placeholder="id"
      />
      <TextField
        onChange={makeStateSetter("password")}
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
