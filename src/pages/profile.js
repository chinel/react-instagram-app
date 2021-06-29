import { useQuery } from "@apollo/react-hooks";
import { Card, CardContent, Hidden } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../App";
import NameBioSection from "../components/profile/NameBioSection";
import OptionsMenu from "../components/profile/OptionsMenu";
import PostCountSection from "../components/profile/PostCount";
import ProfileNameSection from "../components/profile/ProfileNameSection";
import ProfileTabs from "../components/profile/ProfileTabs";
import Layout from "../components/shared/Layout";
import LoadingScreen from "../components/shared/LoadingScreen";
import ProfilePicture from "../components/shared/ProfilePicture";
import { GET_USER_PROFILE } from "../graphql/queries";
import { useProfilePageStyles } from "../styles";

function ProfilePage() {
  const { username } = useParams();
  const { currentUserId } = React.useContext(UserContext);
  const classes = useProfilePageStyles();
  const [showOptionsMenu, setShowOptionsMenu] = React.useState(false);
  const variables = { username };
  const { data, loading } = useQuery(GET_USER_PROFILE, { variables });

  if (loading) return <LoadingScreen />;

  const [user] = data.users;
  const isOwner = user.id === currentUserId;

  function handleOptionsMenuClick() {
    setShowOptionsMenu(true);
  }

  function handleCloseMenu() {
    setShowOptionsMenu(false);
  }

  return (
    <Layout title={`${user.name} (@${user.username})`}>
      <div className={classes.container}>
        <Hidden xsDown>
          <Card className={classes.cardLarge}>
            <ProfilePicture isOwner={isOwner} image={user.profile_image} />
            <CardContent className={classes.cardContentLarge}>
              <ProfileNameSection
                user={user}
                isOwner={isOwner}
                handleOptionsMenuClick={handleOptionsMenuClick}
              />
              <PostCountSection user={user} />
              <NameBioSection user={user} />
            </CardContent>
          </Card>
        </Hidden>
        <Hidden smUp>
          <Card className={classes.cardSmall}>
            <CardContent>
              <section className={classes.sectionSmall}>
                <ProfilePicture
                  size={77}
                  isOwner={isOwner}
                  image={user.profile_image}
                />
                <ProfileNameSection
                  user={user}
                  isOwner={isOwner}
                  handleOptionsMenuClick={handleOptionsMenuClick}
                />
              </section>
              <NameBioSection user={user} />
            </CardContent>
            <PostCountSection user={user} />
          </Card>
        </Hidden>
        {showOptionsMenu && <OptionsMenu handleCloseMenu={handleCloseMenu} />}
        <ProfileTabs user={user} isOwner={isOwner} />
      </div>
    </Layout>
  );
}
export default ProfilePage;
