import React from "react";
import styles from "./SuggestionCard.module.css";

const SuggestionCard = ({ data }) => {
  if (!data) return null;
  const { short_summary, recommended_hashtags, improved_post, three_ctas, readability_tips } = data;

  return (
    <div className={styles.card}>
      <h3>Summary:</h3>
      <p>{short_summary}</p>

      <h3>Hashtags:</h3>
      <p>{recommended_hashtags?.join(" ")}</p>

      <h3>Improved Post:</h3>
      <p>{improved_post}</p>

      <h3>CTAs:</h3>
      <ul>
        {three_ctas?.map((c, i) => <li key={i}>{c}</li>)}
      </ul>

      <h3>Readability Tips:</h3>
      <ul>
        {readability_tips?.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  );
};

export default SuggestionCard;
