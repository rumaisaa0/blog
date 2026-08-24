import { useState } from "react";

export default function CommentForm({ onSubmit }) {
  const [content, setContent] = useState("");

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
      <h3>Add Comment</h3>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        required
      />

      <br />

      <button type="submit">
        Add Comment
      </button>
    </form>
  );
}