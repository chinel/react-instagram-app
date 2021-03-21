import { Button, Hidden, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useEditProfilePageStyles } from "../../styles";
import ProfilePicture from "../shared/ProfilePicture";
import { useForm } from "react-hook-form";
import isURL from "validator/lib/isURL";

function EditUserInfo({ user }) {
  const classes = useEditProfilePageStyles();
  const { register, handleSubmit } = useForm({ mode: "onBlur" });
  return (
    <section className={classes.container}>
      <div className={classes.pictureSectionItem}>
        <ProfilePicture size={38} image={user.profile_image} />
        <div className={classes.justifySelfStart}>
          <Typography className={classes.typography}>
            {user.username}
          </Typography>
          <Typography
            color="primary"
            variant="body2"
            className={classes.typographyChangePic}
          >
            Change Profile Photo
          </Typography>
        </div>
      </div>
      <form className={classes.form}>
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
            value={user.bio}
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
          inputRef={register({
            required: true,
            miniLength: 5,
            maxLength: 20,
          })}
          text="Email"
          formItem={user.email}
          type="email"
        />
        <SectionItem
          text="Phone Number"
          formItem={user.phone_number}
          name="phone"
          inputRef={register({
            required: true,
            miniLength: 5,
            maxLength: 20,
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
    </section>
  );
}

function SectionItem({ type = "text", text, formItem, inputRef, name }) {
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
        variant="outlined"
        fullWidth
        value={formItem}
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
