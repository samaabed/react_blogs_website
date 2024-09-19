import { useState } from "react";
import styles from "./BlogDetails.module.css";
import blogImage from "../../assets/images/dashboard.png";
import React from "react";
import Blog from "../../Blog";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import {faHeart as solidHeart} from '@fortawesome/free-solid-svg-icons';
import i18n from "../../i18n.js";

type Props = {
  blog: Blog
}

const BlogDetails = ({blog}: Props) => {
 
  const [isLiked, setLike] = useState<boolean>(blog.isLiked);
  const language: string = i18n.language;
  
  const handleClick = async (blogId: string): Promise<void> => {
    const updatedBlog = {
      isLiked: !isLiked,
    };

    const response: Response = await fetch(`http://localhost:3000/${language}/${blogId}`, {
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
              <FontAwesomeIcon icon={solidHeart} size="xl" className={styles.likeButton}/>
            ) : (
              <FontAwesomeIcon icon={regularHeart} size="xl" className={styles.likeButton}/>

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
