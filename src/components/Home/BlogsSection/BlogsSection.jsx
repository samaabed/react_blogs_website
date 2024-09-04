import styles from "./BlogsSection.module.css";
import { useEffect, useState, useRef } from "react";
import BlogServices from "../../../services/blog-services";
import BlogUtils from "../../../utils/blog-utils";
import swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import Pagination from "../../common/Pagination";
import blogImage from "../../../assets/images/dashboard.png";
import { setLoading } from "../../../store/slices/loaderSlice";
import { selectLoading } from "../../../store/slices/loaderSlice";
import { useSelector, useDispatch } from "react-redux";

function BlogsSection() {
  const [blogs, setBlogs] = useState(null);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentBlogs, setCurrentBlogs] = useState(null);
  const blogsPerPage = 6;

  const dispatch = useDispatch();

  useEffect(() => {
    //reset loading state when th component mounts
    dispatch(setLoading(true));

    setTimeout(() => {
      BlogServices.fetchBlogs()
        .then((blogs) => {
          BlogUtils.sortBlogsByDate(blogs);
          setBlogs(blogs);
          dispatch(setLoading(false));
          // initial set of blogs to display
          setCurrentBlogs(blogs.slice(0, blogsPerPage));
        })
        .catch(() => {
          BlogUtils.errorAlert("fetch the blogs");
          setError(true);
          dispatch(setLoading(false));
        });
      console.log("use effect called");
    }, 1000);

    //cleanup function (reset loading state if the compoenent unmounts before fetching is completed)
    return () => {
      // clearTimeout(timeoutId);
      dispatch(setLoading(false));
    };
  }, []);

  useEffect(() => {
    // update currentBlogs when currentPage or blogsPerPage changes
    if (blogs != null) {
      const lastBlogIndex = currentPage * blogsPerPage;
      const firstBlogIndex = lastBlogIndex - blogsPerPage;
      setCurrentBlogs(blogs.slice(firstBlogIndex, lastBlogIndex));
    }
  }, [currentPage, blogs]);

  const handleDelete = (blogId) => {
    swal
      .fire({
        title: "Are you sure you want to delete this blog?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          BlogServices.deleteBlog(blogId)
            .then(() => {
              // also update in client side so we don't have to fetch the blogs again to view the update for the user
              const updatedBlogs = blogs.filter((blog) => blog.id != blogId);
              BlogUtils.sortBlogsByDate(updatedBlogs);
              setBlogs(updatedBlogs);
            })
            .then(() => {
              swal.fire({
                title: "Deleted!",
                text: "The blog has been deleted.",
                icon: "success",
                confirmButtonText: "Ok",
                confirmButtonColor: "#3085d6",
              });
            })
            .catch(() => {
              BlogUtils.errorAlert("delete the blog");
            });
        }
      });
  };

  return (
    <>
      {/* {isLoading && <Loading />} */}

      {useSelector(selectLoading) && <Loading />}

      {currentBlogs && (
        <>
          <header>
            <h1 className={styles.sectionHeader}>currently browsing: design</h1>
          </header>
          <main>
            <Link className={styles.addBlogLink} to="/addBlog">
              Add New Blog
            </Link>

            <div id={styles.blogsSection}>
              {currentBlogs.map((blog, index) => (
                <div key={index} className={styles.blogItem}>
                  <div className={styles.imgContainer}>
                    <Link to={`/displayBlog/${blog.id}`}>
                      <img className={styles.blogImg} src={blogImage} alt="" />
                    </Link>
                  </div>
                  <div className="container">
                    <h2 className={styles.blogTitle}>
                      <Link to={`/displayBlog/${blog.id}`}>{blog.title}</Link>
                    </h2>
                    <p className={styles.blogDate}>{blog.date}</p>
                    <p className={styles.blogDescription}>
                      {BlogUtils.truncateDescription(blog.description)}
                    </p>
                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(blog.id)}
                    >
                      Delete
                    </button>

                    <button type="button" className={styles.updateBtn}>
                      <Link to={`/updateBlog/${blog.id}`}>Update</Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Pagination
              totalBlogs={blogs.length}
              blogsPerPage={blogsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </main>
        </>
      )}

      {error && <p>error</p>}
    </>
  );
}

export default BlogsSection;
