import styles from "../BlogsSection.module.css";
import blogImage from "../../../../assets/images/dashboard.png";
import { Link } from "react-router-dom";
import BlogUtils from "../../../../utils/blog-utils";
import { useTranslation } from "react-i18next";
import swal from "sweetalert2";
import BlogsServices from "../../../../services/blog-services";
import i18n from "../../../../i18n";
import Blog from "../../../../Blog";
import React from "react";
import { TFunction } from "i18next";

type Props = {
  blog: Blog,
  blogs: Blog[],
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>
}

export default function BlogsItem({blog, blogs, setBlogs}: Props) {

  const { t }: { t: TFunction } = useTranslation();
  const language: string = i18n.language;


  const handleDelete = (blogId: string): void => {
    swal
      .fire({
        title: t("confirmDeleteMessageTitle"),
        text: t("confirmDeleteMessageText"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("confirmDeleteMessageButton"),
        cancelButtonText: t("cancel")
      })
      .then((result) => {
        if (result.isConfirmed) {
          BlogsServices.deleteBlog(blogId, language)
            .then(() => {
              // also update in client side so we don't have to fetch the blogs again to view the update for the user
              const updatedBlogs = blogs.filter((blog) => blog.id != blogId);
              BlogUtils.sortBlogsByDate(updatedBlogs);
              setBlogs(updatedBlogs); 
            })
            .then(() => {
              BlogUtils.successAlert(t("deleteBlogDoneMessageTitle"), t("deleteBlogDoneMessageText"));
            })
            .catch(() => {
              BlogUtils.errorAlert(t("oops", t("deleteBlogErrorMessageText")));
            });
        }
      });
  };

  return (
    <div className={styles.blogItem}>
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
          onClick={() => handleDelete(blog.id!)}
        >
          {t("delete")}
        </button>

        <button type="button" className={styles.updateBtn}>
          <Link to={`/updateBlog/${blog.id}`}>{t("update")}</Link>
        </button>
      </div>
    </div>
  );
}
