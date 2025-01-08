import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import NavBar from '../components/NavBar';
import PostSummary from '../components/PostSummary';

function HomePage({ onLogout }) {
  const [userId, setUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const POSTS_PER_PAGE = 10;

  const fetchPosts = async (pageNum) => {
    try {
      const response = await fetch(`/api/posts?page=${pageNum}`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      console.log(data.posts);
      
      if (data.posts.length < POSTS_PER_PAGE) {
        setHasMore(false);
      }
      
      setPosts(data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // On page load, make sure user is logged in and request posts from the server
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.user.id);
        
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        onLogout();
      }
    }
  
     fetchPosts(page);
  }, []);

  // Load more handler
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage);
  };

  const saveFunc = () => {
    alert('Post saved!');
    // Will need to send a request to the server to save the post
    // Todo: will need post id
  }

  return (
    <>
      <NavBar onLogout={onLogout}/>
      <h1 className="text-4xl text-center font-bold m-4">Roadmap Posts</h1>
      {posts.map(post => (
        <PostSummary key={post._id} post={post} onSave={saveFunc}/>
      ))}
      {/* Load more button */}
      {hasMore && (
        <div className="text-center my-4">
          <button 
            onClick={handleLoadMore}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>
      )}

      {/* <p className="text-lg">User ID: {userId}</p>  */}
    </>
  );
}

export default HomePage;