import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
