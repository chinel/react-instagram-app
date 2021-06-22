import React from "react";
import { useNavbarStyles, RedTooltip } from "../../styles";
import {
  AddIcon,
  LikeIcon,
  LikeActiveIcon,
  ExploreIcon,
  ExploreActiveIcon,
  HomeIcon,
  HomeActiveIcon,
} from "../../icons";
import { Avatar, Hidden, Zoom } from "@material-ui/core";
import { Link } from "react-router-dom";
import NotificationTooltip from "../notification/NotificationTooltip";
import NotificationList from "../notification/NotificationList";
import { UserContext } from "../../App";
import AddPostDialog from "../post/AddPostDialog";
import isAfter from "date-fns/isAfter";

function Links({ path }) {
  const { me, currentUserId } = React.useContext(UserContext);
  const newNotifications = me.notifications.filter((created_at) => {
    isAfter(new Date(created_at), new Date(me.last_checked));
  });
  console.log("new notifications");
  console.log(newNotifications);
  console.log(currentUserId);
  const hasNotifications = newNotifications.length > 0;
  const classes = useNavbarStyles();
  const [showList, setShowList] = React.useState(false);
  const [showTooltip, setTooltip] = React.useState(hasNotifications);
  const [media, setMedia] = React.useState();
  const [showAddPostDialog, setAddPostDialog] = React.useState(false);
  const inputRef = React.useRef();
  React.useEffect(() => {
    const timeout = setTimeout(handleHideTooltip, 5000);
    return () => {
      clearTimeout(timeout);
    };
  });

  function handleToggleList() {
    setShowList((prev) => !prev);
  }
  function handleHideTooltip() {
    setTooltip(false);
  }

  function handleHideList() {
    setShowList(false);
  }

  function openFileInput() {
    inputRef.current.click();
  }

  function handleAddPost(event) {
    setMedia(event.target.files[0]);
    setAddPostDialog(true);
  }

  function handleClose() {
    setAddPostDialog(false);
  }

  return (
    <div className={classes.linksContainer}>
      {showList && (
        <NotificationList
          notifications={me.notifications}
          handleHideList={handleHideList}
          currentUserId={currentUserId}
        />
      )}

      <div className={classes.linksWrapper}>
        {showAddPostDialog && (
          <AddPostDialog media={media} handleClose={handleClose} />
        )}
        <Hidden xsDown>
          <input
            ref={inputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleAddPost}
          />
          <AddIcon onClick={openFileInput} />
        </Hidden>
        <Link to="/">{path === "/" ? <HomeActiveIcon /> : <HomeIcon />}</Link>
        <Link to="/explore">
          {path === "/explore" ? <ExploreActiveIcon /> : <ExploreIcon />}
        </Link>
        <RedTooltip
          arrow
          open={showTooltip}
          onOpen={handleHideTooltip}
          TransitionComponent={Zoom}
          title={<NotificationTooltip notifications={newNotifications} />}
        >
          <div
            className={hasNotifications ? classes.notifications : ""}
            onClick={handleToggleList}
          >
            {showList ? <LikeActiveIcon /> : <LikeIcon />}
          </div>
        </RedTooltip>
        <Link to={`/${me.username}`}>
          <div
            className={path === `/${me.username}` ? classes.profileActive : ""}
          ></div>
          <Avatar src={me.profile_image} className={classes.profileImage} />
        </Link>
      </div>
    </div>
  );
}

export default Links;
