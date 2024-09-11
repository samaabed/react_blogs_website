import BlogsSection from '../../components/Home/BlogsSection'
import LanguageContext from '../../contexts/LanguageContext';
import { useState } from 'react';


const Home = () => {
    const [language, setLanguage] = useState("en");

const toggleLanguage = () => {
  setLanguage(language === "en" ? "ar" : "en");
};

    return (
        // <LanguageContext.Provider value={{ language, toggleLanguage }}>
        // <BlogsSection />
        // </ LanguageContext.Provider >
        <BlogsSection />
      

    );
}
 
export default Home;