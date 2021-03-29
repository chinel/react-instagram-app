import {
  Avatar,
  AppBar,
  Button,
  Dialog,
  Divider,
  Paper,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { ArrowBackIos, PinDrop } from "@material-ui/icons";
import React from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { UserContext } from "../../App";
import { useAddPostDialogStyles } from "../../styles";
const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

function AddPostDialog({ media, handleClose }) {
  const classes = useAddPostDialogStyles();
  const editor = React.useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = React.useState(initialValue);
  const { me } = React.useContext(UserContext);
  const [location, setLocation] = React.useState("");

  return (
    <Dialog fullScreen open onClose={handleClose}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <ArrowBackIos onClick={handleClose} />
          <Typography align="center" variant="body1" className={classes.title}>
            New Post
          </Typography>
          <Button color="primary" className={classes.share}>
            Share
          </Button>
        </Toolbar>
      </AppBar>
      <Divider />
      <Paper className={classes.paper}>
        <Avatar src={me.profile_image} />
        <Slate
          editor={editor}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        >
          <Editable
            className={classes.editor}
            placeholder="write your caption..."
          />
        </Slate>
        <Avatar
          src={URL.createObjectURL(media)}
          className={classes.avatarLarge}
          variant="square"
        />
      </Paper>
      <TextField
        fullWidth
        placeholder="Location"
        InputProps={{
          classes: {
            root: classes.root,
            input: classes.input,
            underline: classes.underline,
          },
          startAdornment: (
            <InputAdornment>
              <PinDrop />
            </InputAdornment>
          ),
        }}
        onChange={(event) => setLocation(event.target.value)}
      />
    </Dialog>
  );
}

export default AddPostDialog;
