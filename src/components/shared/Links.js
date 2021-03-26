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

function Links({ path }) {
  const classes = useNavbarStyles();
  const [showList, setShowList] = React.useState(false);
  const [showTooltip, setTooltip] = React.useState(true);
  const { me } = React.useContext(UserContext);
  const [media, setMedia] = React.useState();
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

  function handleAddPost(event) {}

  return (
    <div className={classes.linksContainer}>
      {showList && <NotificationList handleHideList={handleHideList} />}
      <div className={classes.linksWrapper}>
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
          title={<NotificationTooltip />}
        >
          <div className={classes.notifications} onClick={handleToggleList}>
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
