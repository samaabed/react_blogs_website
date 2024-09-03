
import React, { memo } from 'react';
import styles from './Pagination.module.css';

// skip re rendering when the  props are the same as the last render
const Pagination = memo(({totalBlogs, blogsPerPage, setCurrentPage, currentPage}) => {


    let pages = [];

    for(let i = 1 ; i <= Math.ceil(totalBlogs/blogsPerPage) ; i++){
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