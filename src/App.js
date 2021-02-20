import React from "react";
import { Switch, Route } from "react-router-dom";
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
  return (
    <Switch>
      <Route exact path="/" component={FeedPage} />
      <Route path="/explore" component={ExplorePage} />
      <Route exact path="/:username" component={ProfilePage} />
      <Route exact path="/p/:postId" component={PostPage} />
      <Route path="/accounts/edit" component={EditProfilePage} />
      <Route path="/accounts/login" component={LoginPage} />
      <Route path="/accounts/emailsignup" component={SignUpPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
}

export default App;
