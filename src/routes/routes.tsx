import Layout from "../pages/Layout/Layout";
import Home from "../pages/HomePage";
import DisplayBlog from "../pages/DisplayBlogPage";
import { Navigate, useParams } from "react-router-dom";
import FormWithValidation from "../pages/FormWithValidation";
import React from "react";

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
      },
      {
        path: "displayBlog/:id",
        element: <DisplayBlog />,
      },
      {
        path: "updateBlog/:id",
        element: <FormWithValidation formType="updateBlog"/>
      },
      {
        path: "addBlog",
        element: <FormWithValidation formType="addBlog"/>
      }
    ],
  },
];
