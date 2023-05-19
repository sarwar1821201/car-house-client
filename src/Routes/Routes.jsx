import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";

import BookService from "../pages/BookService/BookService";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path:'login',
            element: <Login></Login>
        },
        {
            path:'signup',
            element: <Signup></Signup>
        },
        {
            path: 'book/:id',
            element: <BookService></BookService>,
            loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
        }
       
      ]
    },
  ]);



  export default router