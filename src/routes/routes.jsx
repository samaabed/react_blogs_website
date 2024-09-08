import Layout from "../pages/Layout/Layout";
import Home from "../pages/HomePage";
import DisplayBlog from "../pages/DisplayBlogPage";
import AddBlog from "../pages/AddBlogPage";
import { Navigate } from "react-router-dom";
import UpdateBlog from "../pages/UpdateBlogPage/UpdateBlogPage";
import BlogServices from "../services/blog-services"



export const ROUTES = [
  {
    path: "/",
    element: <Layout />,
    children: [
      // when the user visits the root path, the "Navigate" component will redirect 
      // the user to the /home route.
      // the replace prop ensures that the redirect does not add a new entry to the browser’s history stack,
      // so the user wont be able to go back to the root path by hitting the back button.
      { 
            path: "/", // root path
            element: <Navigate to="/home" replace />, // redirect to /home
      },

      {
        path: "home",
        element: <Home />,
        loader: async () => {
          const reeponse =  await BlogServices.fetchBlogs();
          return reeponse;
        }
      },
      {
        path: "displayBlog/:id",
        element: <DisplayBlog />,
        // loader: async ({ params }) => {
        //   console.log('test')
        // },
      
      },
      {
        path: "addBlog",
        element: <AddBlog />,
      },

      {
        path: "updateBlog/:id",
        element: <UpdateBlog />,
      },
    ],
  },
];
