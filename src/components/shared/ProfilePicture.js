import { Avatar } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import React from "react";
import { useProfilePictureStyles } from "../../styles";

function ProfilePicture({
  size,
  image = "https://instagram.com/static/images/anonymousUser.jpg/23e7b3b2a737.jpg",
  isOwner,
}) {
  const classes = useProfilePictureStyles({ size, isOwner });

  return (
    <section className={classes.section}>
      {image ? (
        <div className={classes.wrapper}>
          <img src={image} alt="user profile" className={classes.image} />
        </div>
      ) : (
        <div className={classes.wrapper}>
          <Person className={classes.person} />
        </div>
      )}
    </section>
  );
}

export default ProfilePicture;
