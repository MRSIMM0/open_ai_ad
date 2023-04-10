import React, { useState } from "react";
import styles from "./FileUploader.module.css";

import { useDispatch } from "react-redux";

import {setError} from "../../features/error"

import {addLink} from "../../features/links"


const regex = new RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  );

export default function FileUploader() {


  const dispatch = useDispatch()

  const inputRef = React.useRef(null);

  const [dragActive, setDragActive] = useState(false);

  const [fileReader, setFileReader] = useState(new FileReader());

  const [style,setStyle] = useState({
    backgroundColor: 'rgba(0, 0, 0, 0.100)',
  })

  const handleFile = (file)=>{

    if(file.type!="application/json"){
        dispatch(setError("Invalid file type"))
        return
    }
 
    setFileReader(new FileReader());
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  }



  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFileRead = function (e) {
    const content = JSON.parse(fileReader.result);
    const filtered = content.filter(el=>el.match(regex))
    if(filtered.length != content.length){
        dispatch(setError("Some links are invalid thus where omitted"));
    }
    dispatch(addLink(filtered));
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0])
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0])
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div
    style={dragActive?style:{}}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={styles.file_uploader}
    >
      <input
        ref={inputRef}
        className={styles.input}
        onChange={handleChange}
        type="file"
        accept="application/JSON"
      ></input>
      <div className={styles.text}>
        Drag and drop your file here or <br />
        <br />
        <div
          onClick={() => {
            onButtonClick();
          }}
          className={styles.upload}
        >
          Upload file
        </div>
      </div>
    </div>
  );
}
