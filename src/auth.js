import { useMutation } from "@apollo/react-hooks";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import React, { useState, useEffect } from "react";
import { CREATE_USER } from "./graphql/mutations";
import defaultUserImage from "./images/default-user-image.jpg";

const provider = new firebase.auth.GoogleAuthProvider();

// Find these options in your Firebase console
firebase.initializeApp({
  apiKey: "AIzaSyA-TSz8V_JRXE3gJy5R43YlgxcZXhN8Dm4",
  authDomain: "react-instagram-clone-2b9a9.firebaseapp.com",
  databaseURL:
    "https://react-instagram-clone-2b9a9-default-rtdb.firebaseio.com",
  projectId: "react-instagram-clone-2b9a9",
  storageBucket: "react-instagram-clone-2b9a9.appspot.com",
  messagingSenderId: "437854781427",
  appId: "1:437854781427:web:836fd69b2f8a7c5e021c86",
  measurementId: "G-SMXY24VT5J",
});

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({ status: "loading" });
  const [createUser] = useMutation(CREATE_USER);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim =
          idTokenResult.claims["https://hasura.io/jwt/claims"];

        if (hasuraClaim) {
          setAuthState({ status: "in", user, token });
        } else {
          // Check if refresh is required.
          const metadataRef = firebase
            .database()
            .ref(`metadata/${user.uid}/refreshTime`);

          metadataRef.on("value", async (data) => {
            if (!data.exists) return;
            // Force refresh to pick up the latest custom claims changes.
            const token = await user.getIdToken(true);
            setAuthState({ status: "in", user, token });
          });
        }
      } else {
        setAuthState({ status: "out" });
      }
    });
  }, []);

  async function loginInWithGoogle() {
    const data = await firebase.auth().signInWithPopup(provider);
    if (data.additionalUserInfo.isNewUser) {
      const { uid, displayName, email, photoURL } = data.user;
      //to get the display name we use regex to remove the white space and join it with the last 5 characters from the uid
      const username = `${displayName.replace(/\s+/g, "")}${uid.slice(-5)}`;
      const variables = {
        userId: uid,
        name: displayName,
        username,
        email,
        bio: "",
        website: "",
        phoneNumber: "",
        profileImage: photoURL,
      };
      await createUser({ variables });
    }
  }

  async function loginWithEmailAndPassword(email, password) {
    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return data;
  }

  async function signUpWithEmailAndPassword(formData) {
    const data = await firebase
      .auth()
      .createUserWithEmailAndPassword(formData.email, formData.password);
    if (data.additionalUserInfo.isNewUser) {
      const variables = {
        userId: data.user.uid,
        name: formData.name,
        username: formData.username,
        email: data.user.email,
        bio: "",
        website: "",
        phoneNumber: "",
        profileImage: defaultUserImage,
      };
      await createUser({ variables });
    }
  }

  async function signOut() {
    setAuthState({ status: "loading" });
    await firebase.auth().signOut();
    setAuthState({ status: "out" });
  }

  async function updateEmail(email) {
    await authState.user.updateEmail(email);
    console.log(authState.user);
  }

  if (authState.status === "loading") {
    return null;
  } else {
    return (
      <AuthContext.Provider
        value={{
          authState,
          loginInWithGoogle,
          signOut,
          signUpWithEmailAndPassword,
          loginWithEmailAndPassword,
          updateEmail,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
