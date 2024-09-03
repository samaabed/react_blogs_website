import 'ldrs/superballs'
import styles from './Loading.module.css'


const Loading = () => {
    return ( 
        <div className={styles.loadingWraper}>
            <l-superballs className="loader"
                size="60"
                speed="1.4"
                color="#32315d"
            ></l-superballs>
        </div>
     );
}
 
export default Loading;