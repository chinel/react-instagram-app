import React from "react";
import { Typography } from "@material-ui/core";

function AuthError({ error }) {
  return (
    Boolean(error) && (
      <Typography
        align="center"
        gutterBottom
        variant="body2"
        style={{ color: "red" }}
      >
        {error}
      </Typography>
    )
  );
}

export default AuthError;
