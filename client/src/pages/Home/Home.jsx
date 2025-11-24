import React from "react";
import FileUploader from "../../components/FileUploader/FileUploader";
import SuggestionCard from "../../components/SuggestionCard/SuggestionCard";
import SuggestionCardSkeleton from "../../components/SuggestionCard/SuggestionCardSkeleton";
import { useFileUpload } from "../../hooks/useFileUpload";

const Home = () => {
  const { loading, result, error, handleUpload } = useFileUpload();

  const onFileSelect = (file) => handleUpload(file);

  return (
    <div className="w-full max-w-[900px] bg-gray-800 rounded-xl shadow-md p-8 flex flex-col gap-8">
      
      <h1 className="text-3xl font-bold text-white text-center">
        Social Media Content Analyzer
      </h1>

      <FileUploader onFileSelect={onFileSelect} loading={loading} />

      {error && (
        <p className="text-red-400 text-center text-md">{error}</p>
      )}

      {/* Suggestion Section */}
      {loading && <SuggestionCardSkeleton />}
      {result && !loading && <SuggestionCard data={result.suggestions} />}
    </div>
  );
};

export default Home;
