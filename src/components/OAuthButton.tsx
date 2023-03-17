import Button, { type ButtonProps } from "@mui/material/Button";
import { signIn } from "next-auth/react";
import type {
  BuiltInProviderType,
  RedirectableProviderType,
} from "next-auth/providers";

export interface OAuthButtonProps extends ButtonProps {
  baseColor: string;
  backgroundColor: string;
  accentColor: string;
  authType: Exclude<BuiltInProviderType, RedirectableProviderType>;
}

const OAuthButton: React.FC<OAuthButtonProps> = ({
  baseColor,
  accentColor,
  backgroundColor,
  authType,
}) => {
  const handleClick = () => signIn(authType);

  return (
    <Button
      onClick={handleClick}
      sx={{
        fontWeight: "550",
        transition: "all 300ms",
        border: `1px solid ${baseColor}`,
        color: baseColor,
        "&:hover": {
          backgroundColor: backgroundColor,
          color: accentColor,
        },
      }}
    >
      AUTH TO GOOGLE
    </Button>
  );
};

export default OAuthButton;
