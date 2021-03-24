import {
  Button,
  Hidden,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useEditProfilePageStyles } from "../../styles";
import ProfilePicture from "../shared/ProfilePicture";
import { useForm } from "react-hook-form";
import isURL from "validator/lib/isURL";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../../auth";
import { EDIT_USER } from "../../graphql/mutations";
import { TrendingUpRounded } from "@material-ui/icons";

const DEFAULT_ERROR = { type: "", message: "" };

function EditUserInfo({ user }) {
  const classes = useEditProfilePageStyles();
  const { register, handleSubmit } = useForm({ mode: "onBlur" });
  const { updateEmail } = React.useContext(AuthContext);
  const [editUser] = useMutation(EDIT_USER);
  const [error, setError] = React.useState(DEFAULT_ERROR);
  const [open, setOpen] = React.useState(false);

  async function onSubmit(data) {
    try {
      setError(DEFAULT_ERROR);
      const variables = { ...data, id: user.id };
      await updateEmail(data.email);
      await editUser({ variables });
      setOpen(true);
    } catch (error) {
      console.log("Error updating profile", error);
      handleError(error);
    }
  }

  function handleError(error) {
    if (error.message.includes("users_username_key")) {
      setError({ type: "username", message: "This username is already taken" });
    } else if (error.code.includes("auth")) {
      setError({ type: "email", message: error.message });
    }
  }

  return (
    <section className={classes.container}>
      <div className={classes.pictureSectionItem}>
        <ProfilePicture size={38} image={user.profile_image} />
        <div className={classes.justifySelfStart}>
          <Typography className={classes.typography}>
            {user.username}
          </Typography>
          <input
            type="file"
            accept="image/*"
            id="image"
            style={{ display: "none" }}
          />
          <Typography
            color="primary"
            variant="body2"
            className={classes.typographyChangePic}
          >
            Change Profile Photo
          </Typography>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <SectionItem
          text="Name"
          formItem={user.name}
          name="name"
          inputRef={register({
            required: true,
            miniLength: 5,
            maxLength: 20,
          })}
        />
        <SectionItem
          text="Username"
          error={error}
          formItem={user.username}
          name="username"
          inputRef={register({
            required: true,
            pattern: /^[a-zA-Z0-9_.]*$/,
            miniLength: 5,
            maxLength: 20,
          })}
        />
        <SectionItem
          text="Website"
          formItem={user.website}
          name="website"
          inputRef={register({
            validate: (input) =>
              Boolean(input)
                ? isURL(input, {
                    protocols: ["http", "https"],
                    require_protocol: true,
                  })
                : true,
          })}
        />
        <div className={classes.sectionItem}>
          <aside>
            <Typography className={classes.bio}>Bio</Typography>
          </aside>
          <TextField
            name="bio"
            inputRef={register({
              maxLength: 120,
            })}
            variant="outlined"
            multiline
            rowsMax={3}
            rows={3}
            fullWidth
            defaultValue={user.bio}
          />
        </div>
        <div className={classes.sectionItem}>
          <div />
          <Typography
            className={classes.justifySelfStart}
            color="textSecondary"
          >
            Personal Information
          </Typography>
        </div>
        <SectionItem
          name="email"
          error={error}
          inputRef={register({
            required: true,
            validate: (input) => isEmail(input),
          })}
          text="Email"
          formItem={user.email}
          type="email"
        />
        <SectionItem
          text="Phone Number"
          formItem={user.phone_number}
          name="phoneNumber"
          inputRef={register({
            validate: (input) => (Boolean(input) ? isMobilePhone(input) : true),
          })}
        />
        <div className={classes.sectionItem}>
          <div />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.justifySelfStart}
          >
            Submit
          </Button>
        </div>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        TransitionComponent={Slide}
        message={<span>Profile Updated</span>}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}

function SectionItem({ type = "text", text, formItem, inputRef, name, error }) {
  const classes = useEditProfilePageStyles();
  return (
    <div className={classes.sectionItemWrapper}>
      <aside>
        <Hidden xsDown>
          <Typography className={classes.typography} align="right">
            {text}
          </Typography>
        </Hidden>
        <Hidden smUp>
          <Typography className={classes.typography}>{text}</Typography>
        </Hidden>
      </aside>
      <TextField
        name={name}
        inputRef={inputRef}
        helperText={error?.type === name && error.message}
        variant="outlined"
        fullWidth
        defaultValue={formItem}
        type={type}
        className={classes.textField}
        inputProps={{
          className: classes.textFieldInput,
        }}
      />
    </div>
  );
}

export default EditUserInfo;
