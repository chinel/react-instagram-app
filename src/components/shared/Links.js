import React from "react";
import { useNavbarStyles } from "../../styles";
import {
  AddIcon,
  LikeIcon,
  LikeActiveIcon,
  ExploreIcon,
  ExploreActiveIcon,
  HomeIcon,
  HomeActiveIcon,
} from "../../icons";
import { Avatar, Hidden } from "@material-ui/core";
import { Link } from "react-router-dom";
import { defaultCurrentUser } from "../../data";

function Links({ path }) {
  const classes = useNavbarStyles();
  const [showList, setShowList] = React.useState(false);
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
        <div className={classes.notifications}>
          {showList ? <LikeActiveIcon /> : <LikeIcon />}
        </div>
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
