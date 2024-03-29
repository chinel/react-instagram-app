import { Typography } from "@material-ui/core";
import React from "react";
import { LoadingLargeIcon } from "../../icons";
import { useFollowSuggestionsStyles } from "../../styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FollowSuggestionsItem from "./FollowSuggestionsItem";
import { useQuery } from "@apollo/react-hooks";
import { SUGGEST_USERS } from "../../graphql/queries";
import { UserContext } from "../../App";
function FollowSuggestions({ hideHeader }) {
  const classes = useFollowSuggestionsStyles();
  const { followerIds, me } = React.useContext(UserContext);
  const variables = { limit: 20, followerIds, createdAt: me.created_at };
  const { data, loading } = useQuery(SUGGEST_USERS, { variables });

  return (
    <div className={classes.container}>
      {!hideHeader && (
        <Typography
          color="textSecondary"
          variant="subtitle2"
          className={classes.typography}
        >
          Suggestions For You
        </Typography>
      )}
      {loading ? (
        <LoadingLargeIcon />
      ) : (
        <Slider
          className={classes.slide}
          dots={false}
          infinite
          speed={1000}
          touchThreshold={1000}
          variableWidth
          swipeToSlide
          arrows
          slidesToScroll={3}
          easing="ease-in-out"
        >
          {data.users.map((user) => (
            <FollowSuggestionsItem key={user.id} user={user} />
          ))}
        </Slider>
      )}
    </div>
  );
}

export default FollowSuggestions;
