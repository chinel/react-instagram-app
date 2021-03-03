import { Card, CardContent, Hidden } from "@material-ui/core";
import React from "react";
import NameBioSection from "../components/profile/NameBioSection";
import PostCountSection from "../components/profile/PostCount";
import ProfileNameSection from "../components/profile/ProfileNameSection";
import Layout from "../components/shared/Layout";
import ProfilePicture from "../components/shared/ProfilePicture";
import { defaultCurrentUser } from "../data";
import { useProfilePageStyles } from "../styles";

function ProfilePage() {
  const isOwner = true;
  const classes = useProfilePageStyles();

  return (
    <Layout
      title={`${defaultCurrentUser.name} (@${defaultCurrentUser.username})`}
    >
      <div className={classes.container}>
        <Hidden xsDown>
          <Card className={classes.cardLarge}>
            <ProfilePicture isOwner={isOwner} />
            <CardContent className={classes.cardContentLarge}>
              <ProfileNameSection />
              <PostCountSection />
              <NameBioSection />
            </CardContent>
          </Card>
        </Hidden>
        <Hidden smUp>
          <Card className={classes.cardSmall}>
            <CardContent>
              <section className={classes.sectionSmall}>
                <ProfilePicture isOwner={isOwner} />
                <ProfileNameSection />
              </section>
              <NameBioSection />
            </CardContent>
            <PostCountSection />
          </Card>
        </Hidden>
      </div>
    </Layout>
  );
}
export default ProfilePage;
