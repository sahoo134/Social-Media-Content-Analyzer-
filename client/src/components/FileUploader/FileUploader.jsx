import React, { useRef } from "react";
import styles from "./FileUploader.module.css";

const FileUploader = ({ onFileSelect, loading }) => {
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onFileSelect(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div
      className={styles.uploader}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleChange}
        accept=".pdf,image/*"
      />
      {loading ? <p>Uploading...</p> : <p>Drag & drop a file or click to upload</p>}
    </div>
  );
};

export default FileUploader;
