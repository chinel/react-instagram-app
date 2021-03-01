import { Card, CardContent, Hidden } from "@material-ui/core";
import React from "react";
import Layout from "../components/shared/Layout";
import ProfilePicture from "../components/shared/ProfilePicture";
import { defaultCurrentUser } from "../data";
import { useProfilePageStyles } from "../styles";

function ProfilePage() {
  const classes = useProfilePageStyles();

  return (
    <Layout
      title={`${defaultCurrentUser.name} (@${defaultCurrentUser.username})`}
    >
      <div className={classes.container}>
        <Hidden xsDown>
          <Card className={classes.cardLarge}>
            <ProfilePicture />
            <CardContent className={classes.cardContentLarge}></CardContent>
          </Card>
        </Hidden>
        <Hidden smUp></Hidden>
      </div>
    </Layout>
  );
}
export default ProfilePage;
