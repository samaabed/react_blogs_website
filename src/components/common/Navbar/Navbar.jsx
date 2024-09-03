import styles from './Navbar.module.css'
import logo from '../../../assets/images/logo.png'
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <>
            <nav className={styles.navBar}>
                <div className={styles.navbarContentWraper}>
                    <a className=""><img className={styles.navbarLogo} src={logo} alt="oneextrapixel logo" /></a>
                    <ul className={styles.navBarList}>
                        <li><Link to="/home">home</Link></li>
                        <li><Link to="/addBlog">add new blog</Link></li>

                    </ul>
                    <div className={styles.dropdownMenu}>
                        {/* TODO: use state for drop down */}
                    
                        {/* <i className={styles["fa-solid fa-bars"]} onClick={showDropdownMenu} ></i> */}
                        <div id={styles.dropdownContent}>
                            <a href="#">home</a>
                            <li><Link to="/addBlog">add new blog</Link></li>


                        </div>
                    </div>
                </div>

            </nav>

        </>
    );
}

//TODO: use state for drop down
// var hideDropdownMenu = false;
// function showDropdownMenu() {
//     hideDropdownMenu = !hideDropdownMenu;
//     if (hideDropdownMenu) {
//         document.getElementById("dropdown-content").style.display = "none";
//     } else {
//         document.getElementById("dropdown-content").style.display = "block";
//     }
// }

export default Navbar;