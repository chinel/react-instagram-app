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
