import React from "react";
import { useNavbarStyles } from "../../styles";
import { Typography } from "@material-ui/core";

function NotificationTooltip({ notifications }) {
  const classes = useNavbarStyles();
  const followCount = countNotifications("follow");
  const likeCount = countNotifications("like");

  function countNotifications(notificationsType) {}

  return (
    <div className={classes.tooltipContainer}>
      <div className={classes.tooltip}>
        <span arial-label="Followers" className={classes.followers} />
        <Typography>1</Typography>
      </div>
      <div className={classes.tooltip}>
        <span arial-label="Likes" className={classes.likes} />
        <Typography>1</Typography>
      </div>
    </div>
  );
}

export default NotificationTooltip;
