import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<LoginPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Route>
    )
  )
  
  return <RouterProvider router={router}/>
}

export default App
