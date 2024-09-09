import BlogsSection from '../../components/Home/BlogsSection'
import LanguageContext from '../../contexts/LanguageContext';
import { useState } from 'react';


const Home = () => {
    const [language, setLanguage] = useState();

const toggleLanguage = () => {
  setLanguage(language === "en" ? "ar" : "en");
};

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
        <BlogsSection />
        </ LanguageContext.Provider >
    );
}
 
export default Home;