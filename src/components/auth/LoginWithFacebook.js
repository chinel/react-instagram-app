import React from "react";
import { useLoginPageStyles } from "../../styles";
import FacebookIconBlue from "../../images/facebook-icon-blue.svg";
import FacebookIconWhite from "../../images/facebook-icon-white.png";
import { Button } from "@material-ui/core";
import { AuthContext } from "../../auth";
import { useContext } from "react";
import AuthError from "./AuthError";
import { useHistory } from "react-router-dom";

function LoginWithFacebook({ color, iconColor, variant }) {
  const classes = useLoginPageStyles();
  const { loginWithGoogle } = useContext(AuthContext);
  const facebookIcon =
    iconColor === "blue" ? FacebookIconBlue : FacebookIconWhite;
  const [error, setError] = React.useState("");
  const history = useHistory();
  async function handleLogInWithGoogle() {
    try {
      await loginWithGoogle();
      history.push('/');
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
      <AuthError error={error} />
    </>
  );
}
export default LoginWithFacebook;
