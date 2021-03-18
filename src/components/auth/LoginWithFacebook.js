import React from "react";
import { useLoginPageStyles } from "../../styles";
import FacebookIconBlue from "../../images/facebook-icon-blue.svg";
import FacebookIconWhite from "../../images/facebook-icon-white.png";
import { Button } from "@material-ui/core";
import { AuthContext } from "../../auth";
import { useContext } from "react";

function LoginWithFacebook({ color, iconColor, variant }) {
  const classes = useLoginPageStyles();
  const { loginWithGoogle } = useContext(AuthContext);
  const facebookIcon =
    iconColor === "blue" ? FacebookIconBlue : FacebookIconWhite;
  return (
    <Button
      onClick={handleLogInWithGoogle}
      fullWidth
      color={color}
      variant={variant}
    >
      <img
        src={facebookIcon}
        alt="Facebook Icon"
        className={classes.facebookIcon}
      />
      Log In with Facebook
    </Button>
  );
}
export default LoginWithFacebook;
