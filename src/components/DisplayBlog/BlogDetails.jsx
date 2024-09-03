import { useState } from "react";
import styles from "./BlogDetails.module.css";
import blogImage from "../../assets/images/dashboard.png";

const BlogDetails = (props) => {
  const { blog } = props;
  const [isLiked, setLike] = useState(blog.isLiked);

  const handleClick = async (blogId) => {
    const updatedBlog = {
      isLiked: !isLiked,
    };

    const response = await fetch(`http://localhost:3000/blogs/${blogId}`, {
      method: "PATCH", //partial modification
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBlog),
    });

    setLike(updatedBlog.isLiked);
  };

  return (
    
      <div className={styles.blogWrapper}>
        <h2 className={styles.blogTitle}>{blog.title}</h2>

        <div className={styles.dateAndIconWrapper}>
          <p className={styles.blogDate}>{blog.date}</p>
          <button
            className={styles.likeButton}
            onClick={() => handleClick(blog.id)}
          >
            {isLiked == true ? (
              <i className="fa-solid fa-heart fa-xl"></i>
            ) : (
              <i className="fa-regular fa-heart fa-xl"></i>
            )}
          </button>
        </div>
        <div className={styles.imgContainer}>
          <img className={styles.blogImg} src={blogImage} alt="" />
        </div>
        <p className={styles.blogDescription}>{blog.description}</p>
      </div>
    
  );
};

export default BlogDetails;
