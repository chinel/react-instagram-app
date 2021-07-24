import React from "react";
import {
  Switch,
  Route,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import {
  EditProfilePage,
  ExplorePage,
  FeedPage,
  LoginPage,
  NotFoundPage,
  PostPage,
  ProfilePage,
  SignUpPage,
} from "./pages";
import PostModal from "./components/post/PostModal";
import { AuthContext } from "./auth";
import { useSubscription } from "@apollo/react-hooks";
import { ME } from "./graphql/subscriptions";
import LoadingScreen from "./components/shared/LoadingScreen";

export const UserContext = React.createContext();

function App() {
  const { authState } = React.useContext(AuthContext);
  const isAuth = authState.status === "in";
  const userId = isAuth ? authState.user.uid : null;
  const variables = { userId };
  const { data, loading } = useSubscription(ME, { variables });
  const history = useHistory();
  const location = useLocation();
  // console.log(history, location);
  const prevLocation = React.useRef(location);
  const modal = location.state?.modal;

  React.useEffect(() => {
    //Here we are saying if we are not going back and if the modal is not set to true in the histroy's state
    if (!modal) {
      prevLocation.current = location;
    }
  }, [location, modal, history.action]);

  if (loading) return <LoadingScreen />;

  if (!isAuth) {
    // use unauthenticated routes
    return (
      <Switch>
        <Route path="/accounts/login" component={LoginPage} />
        <Route path="/accounts/emailsignup" component={SignUpPage} />
        {/**If neither of the first two route is hit, that is if the user tries to visit another route when not authenticated redirect them to the login route */}
        <Redirect to="/accounts/login" />
      </Switch>
    );
  }
  const isModalOpen = modal && prevLocation.current !== location;

  const me = isAuth && data ? data.users[0] : null;
  const currentUserId = me.id;
  const followingIds = me.following.map(({ user }) => user.id);
  const followerIds = me.followers.map(({ user }) => user.id);

  return (
    <UserContext.Provider
      value={{
        me,
        currentUserId,
        followingIds,
        followerIds,
      }}
    >
      <Switch location={isModalOpen ? prevLocation.current : location}>
        <Route exact path="/" component={FeedPage} />
        <Route path="/explore" component={ExplorePage} />
        <Route exact path="/:username" component={ProfilePage} />
        <Route exact path="/p/:postId" component={PostPage} />
        <Route path="/accounts/edit" component={EditProfilePage} />
        <Route path="/accounts/login" component={LoginPage} />
        <Route path="/accounts/emailsignup" component={SignUpPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      {isModalOpen && <Route exact path="/p/:postId" component={PostModal} />}
    </UserContext.Provider>
  );
}

export default App;
