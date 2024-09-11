import { useTranslation } from "react-i18next";
import styles from "./Footer.module.css";

function Footer() {
    const {t} = useTranslation();
    return (
        <footer className={styles.footer}>
            <p>&#9400; {t("allRightsReserved")}</p>
        </footer>

    );
}

export default Footer;