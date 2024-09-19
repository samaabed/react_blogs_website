
import React, { memo } from 'react';
import styles from './Pagination.module.css';

type Props = {
    totalBlogs: number,
    blogsPerPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    currentPage: number
  }

// skip re rendering when the  props are the same as the last render
const Pagination = memo(({totalBlogs, blogsPerPage, setCurrentPage, currentPage}: Props) => {


    let pages: number[] = [];

    for(let i: number = 1 ; i <= Math.ceil(totalBlogs/blogsPerPage) ; i++){
            pages.push(i);
            console.log("pushed");            
    }

    return ( 
        <div className={styles.pagination}>
            {
                pages.map((page, index) => {
                    return <button key={index} onClick={()=>setCurrentPage(page)} className={page == currentPage ? styles.activePageBtn : ''}>{page} </button>
                     
                })  
            }
        </div>
     );
});
 
export default Pagination;