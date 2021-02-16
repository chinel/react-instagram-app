import React from "react";
import { useNavbarStyles } from "../../styles";
import { Hidden, InputBase } from "@material-ui/core";
import { LoadingIcon } from "../../icons";
import { getDefaultUser } from "../../data";

function Search() {
  const classes = useNavbarStyles();
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    if (!query.trim()) return;
    setResults(Array.from({ length: 5 }, () => getDefaultUser()));
  }, [query]);

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
