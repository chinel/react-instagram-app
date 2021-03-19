import React from "react";
import { useLoginPageStyles } from "../../styles";
import GoogleColoredIcon from "../../images/google-white-icon-2.png";
import GoogleIconWhite from "../../images/google-icon-white.png";
import { Button } from "@material-ui/core";
import { AuthContext } from "../../auth";
import { useContext } from "react";
import AuthError from "./AuthError";
import { useHistory } from "react-router-dom";

function LoginWithGoogle({ color, iconColor, variant }) {
  const classes = useLoginPageStyles();
  const { loginInWithGoogle } = useContext(AuthContext);
  const facebookIcon =
    iconColor === "blue" ? GoogleColoredIcon : GoogleIconWhite;
  const [error, setError] = React.useState("");
  const history = useHistory();
  async function handleLogInWithGoogle() {
    try {
      await loginInWithGoogle();
      history.push("/");
    } catch (error) {
      console.error("Error logging in with Google", error);
      setError(error.message);
    }
  }

  return (
    <>
      <Button
        onClick={handleLogInWithGoogle}
        fullWidth
        color={color !== "primary" ? color : "default"}
        variant={variant}
        className={color === "primary" ? classes.blueButton : ""}
      >
        <img
          src={facebookIcon}
          alt="Google Icon"
          className={classes.facebookIcon}
        />
        {iconColor === "blue" ? "Log In with Google" : "Sign in with Google"}
      </Button>
      <AuthError error={error} />
    </>
  );
}
export default LoginWithGoogle;
