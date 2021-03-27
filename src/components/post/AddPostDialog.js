import React from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

function AddPostDialog({ media, handleClose }) {
  const editor = React.useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = React.useState([]);

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
