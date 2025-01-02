import { useNavigate} from 'react-router-dom';


function HomePage() {
  const navigate = useNavigate();

  const createPostBtn = () => {
    console.log('Create Post Button Clicked');
    navigate('/create_post');
    // console.log(userId);
  }

  // Request posts from the server
  // use NavBar component

  return (
    <div>
      <h1>Home Page</h1>
     
      <button onClick={createPostBtn}>Create Post</button>
    </div>
  );
}

export default HomePage;