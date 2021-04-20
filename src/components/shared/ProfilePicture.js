import { useMutation } from "@apollo/react-hooks";
import { Person } from "@material-ui/icons";
import React from "react";
import { UserContext } from "../../App";
import { EDIT_USER_AVATAR } from "../../graphql/mutations";
import { useProfilePictureStyles } from "../../styles";
import handleImageUpload from "../../utils/handleImageUpload";

function ProfilePicture({ size, image, isOwner }) {
  const { currentUserId } = React.useContext(UserContext);
  const classes = useProfilePictureStyles({ size, isOwner });
  const inputRef = React.useRef();
  const [img, setImg] = React.useState(image);
  const [editUserAvatar] = useMutation(EDIT_USER_AVATAR);

  function openFileInput() {
    inputRef.current.click();
  }

  async function handleUpdateProfilePic(event) {
    const url = await handleImageUpload(
      event.target.files[0],
      "instagram-avatar"
    );
    const variables = { id: currentUserId, profileImage: url };
    await editUserAvatar({ variables });
    setImg(url);
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
          <img src={img} alt="user profile" className={classes.image} />
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
