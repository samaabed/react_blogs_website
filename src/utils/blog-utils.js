import swal from "sweetalert2";
import { useTranslation } from "react-i18next";

class BlogUtils {

    //sorts the blogs starting from latest ones
    static sortBlogsByDate = (blogs) => {

        blogs.sort((a, b) => {
            let da = new Date(a.date);
            let db = new Date(b.date);
            return db - da;
        });

        return blogs;
    }

    static errorAlert = (title, text) => {
        swal.fire({
            title: title,
            text: text,
            icon: "error",
        });
    }

    static successAlert = (title, text) => {
        swal.fire({
            title: title,
            text: text,
            icon: "success",
          });
    }

    static truncateDescription = (description) => {
        if (description.length > 200) {
            return description.substr(0,200) + '...';
        }
        return description;
    }

    static getCurrentDate = () => {
        const date = new Date();
    
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
    
        return formattedDate;
    }

}

export default BlogUtils;