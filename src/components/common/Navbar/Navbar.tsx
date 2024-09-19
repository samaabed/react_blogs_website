import styles from './Navbar.module.css'
import logo from '../../../assets/images/logo.png'
import { Link, NavigateFunction } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import i18n from '../../../i18n';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { TFunction } from 'i18next';




const Navbar = () => {

    const { t }: { t: TFunction } = useTranslation();
    const [dropDown, setDropDown] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
        const dir: string = lang == "ar" ? "rtl" : "ltr";
        document.documentElement.setAttribute('dir', dir);

        // if user changes language in DisplayBlog page, redirect to  home page
        const currentPath: string = window.location.pathname; // get the current path
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