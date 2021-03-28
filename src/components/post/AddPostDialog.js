import React from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { makeStyles } from "@material-ui/core";

const useAddPostDialogStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    background: "#fff !important",
    color: "#000 !important",
    display: "flex",
    justifyContent: "space-between",
    height: "54px !important",
  },
  toolbar: {
    minHeight: "54px !important",
  },
  title: {
    flex: 1,
    fontWeight: 600,
  },
  paper: {
    display: "flex",
    alignItems: "flex-start",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  editor: {
    flex: 1,
  },
  avatarLarge: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  input: {
    padding: "10px !important",
    fontSize: "14px !important",
  },
}));

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

function AddPostDialog({ media, handleClose }) {
  const editor = React.useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = React.useState(initialValue);

  /*   <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <Editable />
    </Slate> */
  return <span>addpost dialog</span>;
}

export default AddPostDialog;
