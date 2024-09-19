import 'ldrs/superballs'
import styles from './Loading.module.css'
import React from "react";



const Loading = () => {
    return ( 
        <div className={styles.loadingWraper}>
            {/* <I-superballs className="loader"
                size="60"
                speed="1.4"
                color="#32315d"
            ></I-superballs> */}
            loading...
        </div>
     );
}
 
export default Loading;