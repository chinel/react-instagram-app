import { Person } from "@material-ui/icons";
import React from "react";
import { useProfilePictureStyles } from "../../styles";

function ProfilePicture({ size, image, isOwner }) {
  const classes = useProfilePictureStyles({ size, isOwner });
  const inputRef = React.useRef();
  function openFileInput() {
    inputRef.current.click();
  }

  return (
    <section className={classes.section}>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleUpdateProfilePic}
      />
      {image ? (
        <div
          className={classes.wrapper}
          onClick={isOwner ? openFileInput : () => null}
        >
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
