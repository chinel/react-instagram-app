import { Avatar, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useNotificationListStyles } from "../../styles";
import FollowButton from "../shared/FollowButton";
import useOutsideClick from "@rooks/use-outside-click";
import { CHECK_NOTIFICATIONS } from "../../graphql/mutations";
import { useMutation } from "@apollo/react-hooks";
import { formatDateToNowShort } from "../../utils/formatDate";
function NotificationList({ handleHideList, notifications, currentUserId }) {
  const listContainerRef = React.useRef();
  const classes = useNotificationListStyles();
  useOutsideClick(listContainerRef, handleHideList);
  const [checkNotifications] = useMutation(CHECK_NOTIFICATIONS);

  React.useEffect(() => {
    const variables = {
      userId: currentUserId,
      lastChecked: new Date().toISOString(),
    };
    // console.log("mounted notification list");
    // console.log(currentUserId);
    checkNotifications({ variables });
  }, [currentUserId, checkNotifications]);

  return (
    <Grid className={classes.listContainer}>
      {notifications.map((notification) => {
        const isLike = notification.type === "like";
        const isFollow = notification.type === "follow";

        return (
          <Grid
            ref={listContainerRef}
            key={notification.id}
            item
            className={classes.listItem}
          >
            <div className={classes.listItemWrapper}>
              <div className={classes.avatarWrapper}>
                <Avatar
                  src={notification.user.profile_image}
                  alt="User avatar"
                />
              </div>
              <div className={classes.nameWrapper}>
                <Link to={`/${notification.user.username}`}>
                  <Typography variant="body1">
                    {notification.user.username}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.typography}
                  >
                    {isLike &&
                      `likes your photo. ${formatDateToNowShort(
                        notification.created_at
                      )}`}
                    {isFollow &&
                      `started following you. ${formatDateToNowShort(
                        notification.created_at
                      )}`}
                  </Typography>
                </Link>
              </div>
            </div>
            <div>
              {isLike && (
                <Link to={`/p/${notification.post.id}`}>
                  <Avatar src={notification.post.media} alt="post cover" />
                </Link>
              )}
              {isFollow && <FollowButton id={notification.user.id} />}
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default NotificationList;
