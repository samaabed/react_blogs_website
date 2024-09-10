import styles from "./BlogsSection.module.css";
import blogImage from "../../../assets/images/dashboard.png";
import { Link } from "react-router-dom";
import BlogUtils from "../../../utils/blog-utils";
import { useTranslation } from "react-i18next";

export default function BlogsItem({blog}) {

  const { t } = useTranslation();

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
          onClick={() => handleDelete(blog.id)}
        >
          {t("common.delete")}
        </button>

        <button type="button" className={styles.updateBtn}>
          <Link to={`/updateBlog/${blog.id}`}>{t("common.update")}</Link>
        </button>
      </div>
    </div>
  );
}
