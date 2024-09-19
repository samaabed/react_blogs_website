import swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import Blog from "../Blog";

class BlogUtils {

    // sorts the blogs starting from latest ones
    static sortBlogsByDate = (blogs: Blog[]): Blog[] => {

        blogs.sort((a, b) => {
            let da: any = new Date(a.date);
            let db: any = new Date(b.date);
            return db  - da;
        });

        return blogs;
    }

    static errorAlert = (title: string, text: string): void => {
        swal.fire({
            title: title,
            text: text,
            icon: "error",
        });
    }

    static successAlert = (title: string, text:string): void => {
        swal.fire({
            title: title,
            text: text,
            icon: "success",
          });
    }

    static truncateDescription = (description: string): string => {
        if (description.length > 200) {
            return description.substr(0,200) + '...';
        }
        return description;
    }

    static getCurrentDate = (): string => {
        const date: Date = new Date();
    
        const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
        const formattedDate: string = date.toLocaleDateString('en-US', options);
    
        return formattedDate;
    }

}

export default BlogUtils;