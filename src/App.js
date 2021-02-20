import React from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
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

function App() {
  const history = useHistory();
  const location = useLocation();
  // console.log(history, location);
  const prevLocation = React.useRef(location);
  const modal = location.state?.modal;

  React.useEffect(() => {
    //Here we are saying if we are not going back and if the modal is not set to true in the histroy's state
    if (history.action !== "POP" && !modal) {
      prevLocation.current = location;
    }
  }, [location, modal, history.action]);

  const isModalOpen = modal && prevLocation.current !== location;

  return (
    <>
      <Switch location={isModalOpen ? prevLocation : location}>
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
    </>
  );
}

export default App;
