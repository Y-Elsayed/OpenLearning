import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<LoginPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/create_post' element={<CreatePostPage/>}/>
      </Route>
    )
  )
  
  return <RouterProvider router={router}/>
}

export default App
