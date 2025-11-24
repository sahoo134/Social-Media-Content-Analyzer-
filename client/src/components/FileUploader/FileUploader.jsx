import React, { useRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const FileUploader = ({ onFileSelect, loading }) => {
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };

  const handleClick = () => fileInputRef.current.click();

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onFileSelect(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div
      className="w-full max-w-2xl mx-auto cursor-pointer rounded-xl border border-gray-600 p-8 text-center bg-gray-800 hover:bg-gray-700 transition-all duration-200 relative flex items-center justify-center gap-4"
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

      {loading ? (
        <div className="flex items-center gap-3">
          <AiOutlineLoading3Quarters className="animate-spin text-blue-400 text-2xl" />
          <p className="text-lg font-medium text-white">Uploading...</p>
        </div>
      ) : (
        <div>
          <p className="text-lg font-semibold text-white">Upload your file</p>
          <p className="text-sm text-gray-300 mt-1">
            Click or drag & drop here <br /> (Images & PDF supported)
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
