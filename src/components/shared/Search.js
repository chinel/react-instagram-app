import React from "react";
import { useNavbarStyles } from "../../styles";
import { Hidden, InputBase } from "@material-ui/core";
import { LoadingIcon } from "../../icons";

function Search() {
  const classes = useNavbarStyles();
  const [query, setQuery] = React.useState("");

  let loading = false;

  const handleClearInput = () => {
    setQuery("");
  };
  return (
    <Hidden xsDown>
      <InputBase
        className={classes.input}
        onChange={(event) => setQuery(event.target.value)}
        startAdornment={<span className={classes.searchIcon} />}
        endAdornment={
          loading ? (
            <LoadingIcon />
          ) : (
            <span onClick={handleClearInput} className={classes.clearIcon} />
          )
        }
        placeholder="Search"
        value={query}
      />
    </Hidden>
  );
}

export default Search;
