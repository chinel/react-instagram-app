import React from "react";
import { useNavbarStyles, WhiteTooltip } from "../../styles";
import {
  Avatar,
  Fade,
  Grid,
  Hidden,
  InputBase,
  Typography,
} from "@material-ui/core";
import { LoadingIcon } from "../../icons";
import { getDefaultUser } from "../../data";
import { useLazyQuery } from "@apollo/react-hooks";
import { SEARCH_USERS } from "../../graphql/queries";

function Search({ history }) {
  const classes = useNavbarStyles();
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [searchUsers] = useLazyQuery(SEARCH_USERS);

  const hasResults = Boolean(query) && results.length > 0;

  React.useEffect(() => {
    if (!query.trim()) return;
    setLoading(true);
    // setResults(Array.from({ length: 5 }, () => getDefaultUser()));
  }, [query]);

  const handleClearInput = () => {
    setQuery("");
  };
  return (
    <Hidden xsDown>
      <WhiteTooltip
        arrow
        interactive
        TransitionComponent={Fade}
        open={hasResults}
        title={
          hasResults && (
            <Grid className={classes.resultContainer} container>
              {results.map((result) => (
                <Grid
                  key={result.id}
                  item
                  className={classes.resultLink}
                  onClick={() => {
                    history.push(`/${result.username}`);
                    handleClearInput();
                  }}
                >
                  <div className={classes.resultWrapper}>
                    <div className={classes.avatarWrapper}>
                      <Avatar src={result.profile_image} alt="user avatar" />
                    </div>
                    <div className={classes.nameWrapper}>
                      <Typography variant="body1">{result.username}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {result.name}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          )
        }
      >
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
      </WhiteTooltip>
    </Hidden>
  );
}

export default Search;
