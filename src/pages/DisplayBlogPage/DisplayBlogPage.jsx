import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogsServices from "../../services/blog-services";
import Loading from "../../components/common/Loading/Loading";
import BlogDetails from "../../components/DisplayBlog";

const DisplayBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {

        //move to blog details
        setTimeout(() => {
            //or: send blogs array as a prop
            BlogsServices.fetchBlogById(id)
                .then((blog) => {
                    setBlog(blog)
                    setLoading(false);
                })
                .catch(() => {
                    setError(true);
                    setLoading(false);
                })
        }, 1000);


    }, []);

    return (
        <>
            {isLoading && <Loading />}
            {blog && <BlogDetails blog={blog} />}
            {error && <p>error</p>}
        </>
    );
}

export default DisplayBlog;