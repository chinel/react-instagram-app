import React from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

function AddPostDialog({ media, handleClose }) {
  const editor = React.useMemo(() => withReact(createEditor()), []);

  return <span>addpost dialog</span>;
}

export default AddPostDialog;
