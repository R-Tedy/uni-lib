import React from 'react';
// import Imagekit from 'imagekit';
import { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(false);
  setFile(true);

  console.log(file);

  return (
    <div>FileUpload</div>
  )
}

export default FileUpload