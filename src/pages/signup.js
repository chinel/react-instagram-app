import React from "react";
import { Button, Card, TextField, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import LoginWithFacebook from "../components/auth/LoginWithFacebook";
import SEO from "../components/shared/Seo";
import { useSignUpPageStyles } from "../styles";
import { AuthContext } from "../auth";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";

function SignUpPage() {
  const classes = useSignUpPageStyles();
  const { register, handleSubmit, formState } = useForm({ mode: "onBlur" }); // passing onBlur as the mode validates only when the user blurs away from the form field
  const { signUpWithEmailAndPassword } = React.useContext(AuthContext);
  // const [values, setValues] = React.useState({
  //   email: "",
  //   name: "",
  //   username: "",
  //   password: "",
  // });

  const history = useHistory();

  // function handleChange(event) {
  //   const { name, value } = event.target;
  //   setValues((prev) => ({ ...prev, [name]: value }));
  // }

  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   await signUpWithEmailAndPassword(values);
  //   history.push("/");
  // }

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <SEO title="Sign up" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <div className={classes.cardHeader} />
            <Typography className={classes.cardHeaderSubHeader}>
              Sign up to see photos and videos from your friends.
            </Typography>
            <LoginWithFacebook
              color="primary"
              iconColor="white"
              variant="contained"
            />
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                name="email"
                // onChange={handleChange}
                inputRef={register({
                  required: true,
                  validate: (input) => isEmail(input),
                })}
                fullWidth
                variant="filled"
                label="Email"
                type="email"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                name="name"
                // onChange={handleChange}
                inputRef={register({
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                })}
                fullWidth
                variant="filled"
                label="Full Name"
                margin="dense"
                className={classes.textField}
              />
              <TextField
                name="username"
                // onChange={handleChange}
                inputRef={register({
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                  // accept only lowercase/uppercase letters , numbers, periods and underscore
                  pattern: /^[a-zA-Z0-9_.]*$/,
                })}
                fullWidth
                variant="filled"
                label="Username"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                name="password"
                // onChange={handleChange}
                inputRef={register({
                  required: true,
                  minLength: 5,
                })}
                fullWidth
                variant="filled"
                label="Password"
                type="password"
                margin="dense"
                className={classes.textField}
                autoComplete="new-password"
              />
              <Button
                disabled={!formState.isValid || formState.isSubmitting}
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
                Sign Up
              </Button>
            </form>
          </Card>
          <Card className={classes.loginCard}>
            <Typography variant="body2" align="right">
              Have an account?
            </Typography>
            <Link to="/accounts/login">
              <Button color="primary" className={classes.loginButton}>
                Log In
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  );
}

export default SignUpPage;
