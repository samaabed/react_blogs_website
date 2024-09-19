import styles from "./BlogsSection.module.css";
import { useEffect, useState } from "react";
import BlogServices from "../../../services/blog-services";
import BlogUtils from "../../../utils/blog-utils";
import { Link } from "react-router-dom";
import Pagination from "../../common/Pagination";
import { setLoading } from "../../../store/slices/loaderSlice";
import { useDispatch } from "react-redux";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
import BlogsItem from "./BlogsItem";
import React from "react";
import Blog from "../../../Blog";
import { Dispatch } from "redux";
import { TFunction } from "i18next";

function BlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentBlogs, setCurrentBlogs] = useState<Blog[]>([]);
  const blogsPerPage: number = 6;

  const dispatch: Dispatch = useDispatch();
  const { t }: { t: TFunction } = useTranslation();
  const language: string = i18n.language;
  
  useEffect(() => {
    //reset loading state when th component mounts
    dispatch(setLoading(true));
    
    //display page 1 when language is changed
    setCurrentPage(1);

    setTimeout(() => {
      BlogServices.fetchBlogs()
        .then((blogs: Blog[]) => {
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
  }, [language]);
  

  useEffect(() => {

    // update currentBlogs when currentPage or blogsPerPage changes
    if (blogs != null) {
      const lastBlogIndex: number = currentPage * blogsPerPage;
      const firstBlogIndex: number = lastBlogIndex - blogsPerPage;
      setCurrentBlogs(blogs.slice(firstBlogIndex, lastBlogIndex));
    }
    
  }, [currentPage, blogs]);

 
  return (
    <>
      {currentBlogs.length > 0 && (
        <>
          <header>
            <h1 className={styles.sectionHeader}>{t("currentlyBrowsing")}: {t("desgin")}</h1>
          </header>
    
          <main>
            <Link className={styles.addBlogLink} to="/addBlog">
              {t("addNewBlog")}
            </Link>

            <div id={styles.blogsSection}>
              {currentBlogs.map((blog, index) => (
                <BlogsItem key={index} blog={blog} blogs={blogs} setBlogs={setBlogs}/>
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
