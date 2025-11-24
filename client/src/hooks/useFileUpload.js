import { useState } from "react";
import { uploadFile } from "../services/uploadService";

export function useFileUpload() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    if (!file) return; // Prevent uploading null
    setLoading(true);
    setError(null);
    try {
      const data = await uploadFile(file);
      setResult(data);
    } catch (err) {
      setError(err?.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset function to clear all states
  const reset = () => {
    setResult(null);
    setError(null);
    setLoading(false);
  };

  return { loading, result, error, handleUpload, reset };
}
