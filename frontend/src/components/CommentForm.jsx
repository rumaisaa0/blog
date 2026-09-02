import { useState } from "react";
import { useTranslation } from "react-i18next";
export default function CommentForm({ onSubmit }) {
  const [content, setContent] = useState("");
  const { t } = useTranslation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    await onSubmit(content);

    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{t("comments.add")}</h3>

      <textarea value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."  required />

      <br />

      <button type="submit"> {t("comments.add")} </button>
    </form>
  );
}