export default function ContributorList({ contr}) {
  if (!contr || contr.length === 0) {
    return <p>No contributors yet.</p>;
  }

  return (
    <div>
        <h3> User ID: {contr.user_id} </h3>
      {contr.map((contr) => (
        <div key={contr.id}>

          <p>{contr.username}</p>



          <hr />
        </div>
      ))}
    </div>
  );
}