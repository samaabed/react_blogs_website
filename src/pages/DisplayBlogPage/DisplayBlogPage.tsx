import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import BlogsServices from "../../services/blog-services";
import BlogDetails from "../../components/DisplayBlog";
import { setLoading } from "../../store/slices/loaderSlice";
import { useDispatch } from "react-redux";
import i18n from "../../i18n";
import Blog from "../../Blog";
import { Dispatch } from "redux";
import React from "react";

const DisplayBlog = () => {
  const { id } = useParams<{ id: string }>(); 
  const [blog, setBlog] = useState<Blog>();
  const [error, setError] = useState<boolean>(false);
  const dispatch: Dispatch = useDispatch();
  const language: string = i18n.language;

  useEffect(() => {
    // reset loading state when th component mounts
    dispatch(setLoading(true));
    
    setTimeout(() => {
      BlogsServices.fetchBlogById(id, language)
        .then((blog: Blog) => {
          setBlog(blog);
          dispatch(setLoading(false));
        })
        .catch(() => {
          setError(true);
          dispatch(setLoading(false));
        });
    }, 1000);

    // cleanup function (reset loading state if the compoenent unmounts before fetching is completed)
    return () => {
      dispatch(setLoading(false));
    };
  }, []);

  return (
    <>
      { blog && <BlogDetails blog={blog} />}
      {error && <p>error</p>}
    </>
  );
};

export default DisplayBlog;
