import React from "react";
import { LoadingIcon } from "../../icons";
import { useLoadingScreenStyles } from "../../styles";

function LoadingScreen() {
  const classes = useLoadingScreenStyles();

  return (
    <section className={classes.section}>
      <span>
        <LoadingIcon />
      </span>
    </section>
  );
}

export default LoadingScreen;
