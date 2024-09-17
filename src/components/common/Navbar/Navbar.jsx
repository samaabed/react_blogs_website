import styles from './Navbar.module.css'
import logo from '../../../assets/images/logo.png'
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import i18n from '../../../i18n';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {

    const { t } = useTranslation();
    const [dropDown, setDropDown] = useState(false);
    const navigate  = useNavigate();

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        const dir = lang == "ar" ? "rtl" : "ltr";
        document.documentElement.setAttribute('dir', dir);

        // if user changes language in DisplayBlog page, redirect to  home page
        const currentPath = window.location.pathname; // get the current path
        console.log("current path "+ currentPath);
        if (currentPath.match(/^\/displayBlog\/[a-zA-Z0-9]+$/)){
            navigate("/home");
        }
    }

    return (
        <>
            <nav className={styles.navBar}>
                <div className={styles.navbarContentWraper}>
                    <a className=""><img className={styles.navbarLogo} src={logo} alt="oneextrapixel logo" /></a>
                    <ul className={styles.navBarList}>
                        <li><Link to="/home">{t("home")}</Link></li>
                        <li><Link to="/addBlog">{t("addNewBlog")}</Link></li>

                    </ul>
                    <div className={styles.dropdownMenu}>
                        <FontAwesomeIcon icon={faBars} className={styles.navbarIcon} onClick={() => { setDropDown(!dropDown) }}/>
                        {
                            dropDown ?   <div id={styles.dropdownContent}>
                            <a href="#" onClick={()=>handleLanguageChange("ar")}>العربية</a>
                            <a href="#" onClick={()=>handleLanguageChange("en")}>English</a>
                        </div> : ''
                        }
                       
                    </div>
                </div>

            </nav>

        </>
    );
}


export default Navbar;