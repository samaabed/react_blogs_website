import styles from './Navbar.module.css'
import logo from '../../../assets/images/logo.png'
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import i18n from '../../../i18n';



const Navbar = () => {

    const { t } = useTranslation();
    const [dropDown, setDropDown] = useState(false);

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
        const dir = lang == "ar" ? "rtl" : "ltr";
        document.documentElement.setAttribute('dir', dir);
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