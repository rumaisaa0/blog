export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>

          <small>
            User ID: {comment.user_id}
          </small>

          <hr />
        </div>
      ))}
    </div>
  );
}