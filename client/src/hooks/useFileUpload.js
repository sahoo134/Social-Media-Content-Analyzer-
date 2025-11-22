import { useState } from "react";
import { uploadFile } from "../services/uploadService";

export function useFileUpload() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
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

  return { loading, result, error, handleUpload };
}
