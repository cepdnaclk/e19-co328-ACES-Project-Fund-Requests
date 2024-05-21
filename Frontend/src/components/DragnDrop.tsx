import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["PDF"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = () => {
    setFile(file);
  };
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
}

export default DragDrop;
