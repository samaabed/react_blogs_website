import styles from "./BlogsSection.module.css";
import { useEffect, useState } from "react";
import BlogServices from "../../../services/blog-services";
import BlogUtils from "../../../utils/blog-utils";
import swal from "sweetalert2";
import { Link } from "react-router-dom";
import Pagination from "../../common/Pagination";
import { setLoading } from "../../../store/slices/loaderSlice";
import { useDispatch } from "react-redux";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
import BlogsItem from "./BlogsItem";


function BlogsSection() {
  const [blogs, setBlogs] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBlogs, setCurrentBlogs] = useState(null);
  const blogsPerPage = 6;

  const dispatch = useDispatch();

  const { t } = useTranslation();
  // const { language, toggleLanguage}  = useContext(LanguageContext);
  // console.log("lang "+language);
  const language = i18n.language;
  
  useEffect(() => {
    //reset loading state when th component mounts
    dispatch(setLoading(true));

    setTimeout(() => {
      let allBlogs = t('blogs', { returnObjects: true });
      BlogUtils.sortBlogsByDate(allBlogs);
      setBlogs(allBlogs);
      dispatch(setLoading(false))

    }, 1000);

    //cleanup function (reset loading state if the compoenent unmounts before fetching is completed)
    return () => {
      dispatch(setLoading(false));
    };
  }, [language]);

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
      {currentBlogs && (
        <>
          <header>
            <h1 className={styles.sectionHeader}>{t("common.currentlyBrowsing")}: {t("common.desgin")}</h1>
          </header>
          <button onClick={() => {i18n.changeLanguage("ar"); setCurrentPage(1);}}>ar</button>
          <button onClick={() => {i18n.changeLanguage("en"); setCurrentPage(1);}}>en</button>
          <main>
            <Link className={styles.addBlogLink} to="/addBlog">
              {t("common.addNewBlog")}
            </Link>

            <div id={styles.blogsSection}>
              {currentBlogs.map((blog, index) => (
                <BlogsItem key={index} blog={blog} />
                // <div key={index} className={styles.blogItem}>
                //   <div className={styles.imgContainer}>
                //     <Link to={`/displayBlog/${blog.id}`}>
                //       <img className={styles.blogImg} src={blogImage} alt="" />
                //     </Link>
                //   </div>
                //   <div className="container">
                //     <h2 className={styles.blogTitle}>
                //       <Link to={`/displayBlog/${blog.id}`}>{ blog.title }</Link>
                //     </h2>
                //     <p className={styles.blogDate}>{blog.date}</p>
                //     <p className={styles.blogDescription}>
                //       {BlogUtils.truncateDescription(blog.description)}
                //     </p>
                //     <button
                //       type="button"
                //       className={styles.deleteBtn}
                //       onClick={() => handleDelete(blog.id)}
                //     >
                //       Delete
                //     </button>

                //     <button type="button" className={styles.updateBtn}>
                //       <Link to={`/updateBlog/${blog.id}`}>Update</Link>
                //     </button>
                //   </div>
                // </div>
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

    </>
  );
}

export default BlogsSection;
