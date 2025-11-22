import React, { useState } from "react";
import FileUploader from "../../components/FileUploader/FileUploader";
import SuggestionCard from "../../components/SuggestionCard/SuggestionCard";
import { useFileUpload } from "../../hooks/useFileUpload";
import styles from "./Home.module.css";

const Home = () => {
  const { loading, result, error, handleUpload } = useFileUpload();
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileSelect = (file) => {
    setSelectedFile(file);
    handleUpload(file);
  };

  return (
    <div className={styles.container}>
      <h1>Social Media Content Analyzer</h1>
      <FileUploader onFileSelect={onFileSelect} loading={loading} />

      {error && <p className={styles.error}>{error}</p>}
      {result && <SuggestionCard data={result.suggestions} />}
    </div>
  );
};

export default Home;
