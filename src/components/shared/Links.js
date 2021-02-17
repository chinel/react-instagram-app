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
import { defaultCurrentUser } from "../../data";
import NotificationTooltip from "../notification/NotificationTooltip";

function Links({ path }) {
  const classes = useNavbarStyles();
  const [showList, setShowList] = React.useState(false);
  const [showTooltip, setTooltip] = React.useState(false);

  function handleToggleList() {
    setShowList((prev) => !prev);
  }
  function handleHideTooltip() {
    setTooltip(false);
  }

  return (
    <div className={classes.linksContainer}>
      <div className={classes.linksWrapper}>
        <Hidden xsDown>
          <AddIcon />
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
        <Link to={`/${defaultCurrentUser.username}`}>
          <div
            className={
              path === `/${defaultCurrentUser.username}`
                ? classes.profileActive
                : ""
            }
          ></div>
          <Avatar
            src={defaultCurrentUser.profile_image}
            className={classes.profileImage}
          />
        </Link>
      </div>
    </div>
  );
}

export default Links;
