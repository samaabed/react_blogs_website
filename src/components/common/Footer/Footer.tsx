import { useTranslation } from "react-i18next";
import styles from "./Footer.module.css";
import React from "react";
import { TFunction } from "i18next";

function Footer() {
    const { t }: { t: TFunction } = useTranslation();
    
    return (
        <footer className={styles.footer}>
            <p>&#9400; {t("allRightsReserved")}</p>
        </footer>

    );
}

export default Footer;