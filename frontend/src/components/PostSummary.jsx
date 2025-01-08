function PostSummary({ post, onSave }) {
  console.log(post);
  const { createdAt, creatorId, title, description, field } = post;
  console.log(creatorId);
  const author = creatorId.username; // this should be name not username

  // Format the date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto my-4 transform transition duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Field: {field}</span>
        <span className="text-gray-600">{formattedDate}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">By: {author}</span>
        <button
          onClick={onSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default PostSummary;