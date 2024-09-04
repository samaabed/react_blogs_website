import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import BlogsServices from "../../services/blog-services";
import Loading from "../../components/common/Loading/Loading";
import BlogDetails from "../../components/DisplayBlog";
import { setLoading } from "../../store/slices/loaderSlice";
import { selectLoading } from "../../store/slices/loaderSlice";
import { useSelector, useDispatch } from "react-redux";

const DisplayBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    //reset loading state when th component mounts
    dispatch(setLoading(true));
    
    setTimeout(() => {
      BlogsServices.fetchBlogById(id)
        .then((blog) => {
          setBlog(blog);
          dispatch(setLoading(false));
        })
        .catch(() => {
          setError(true);
          dispatch(setLoading(false));
        });
    }, 1000);

    //cleanup function (reset loading state if the compoenent unmounts before fetching is completed)
    return () => {
      dispatch(setLoading(false));
    };
  }, []);

  return (
    <>
      {useSelector(selectLoading) && <Loading />}
      { blog && <BlogDetails blog={blog} />}
      {error && <p>error</p>}
    </>
  );
};

export default DisplayBlog;
