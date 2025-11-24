import React from "react";
import { AiOutlineCopy } from "react-icons/ai";

const SuggestionCard = ({ data }) => {
  if (!data) return null;

  const { short_summary, recommended_hashtags, improved_post, three_ctas, readability_tips } = data;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    }).catch(() => {
      alert("Failed to copy!");
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 rounded-xl bg-gray-800 border border-gray-700 shadow-lg mt-6 space-y-6">
      
      {/* Summary */}
      <section>
        <h3 className="text-lg font-semibold text-blue-400 border-b border-gray-600 pb-1">Summary</h3>
        <p className="text-gray-200 mt-2">{short_summary}</p>
      </section>

      {/* Hashtags */}
      <section>
        <h3 className="text-lg font-semibold text-blue-400 border-b border-gray-600 pb-1 flex justify-between items-center">
          Hashtags
          <button
            onClick={() => handleCopy(recommended_hashtags.join(" "))}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <AiOutlineCopy /> Copy
          </button>
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {recommended_hashtags?.map((tag, index) => (
            <span key={index} className="px-3 py-1 text-sm rounded-full border border-gray-500 text-gray-200 bg-gray-700">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Improved Post */}
      <section>
        <h3 className="text-lg font-semibold text-blue-400 border-b border-gray-600 pb-1 flex justify-between items-center">
          Improved Post
          <button
            onClick={() => handleCopy(improved_post)}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white"
          >
            <AiOutlineCopy /> Copy
          </button>
        </h3>
        <p className="text-gray-200 mt-2 leading-relaxed">{improved_post}</p>
      </section>

      {/* CTAs */}
      <section>
        <h3 className="text-lg font-semibold text-blue-400 border-b border-gray-600 pb-1">Call To Actions</h3>
        <ul className="list-disc list-inside text-gray-200 mt-2 space-y-1">
          {three_ctas?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Readability Tips */}
      <section>
        <h3 className="text-lg font-semibold text-blue-400 border-b border-gray-600 pb-1">Readability Tips</h3>
        <ul className="list-disc list-inside text-gray-200 mt-2 space-y-1">
          {readability_tips?.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </section>

    </div>
  );
};

export default SuggestionCard;
