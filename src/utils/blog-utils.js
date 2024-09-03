import swal from "sweetalert2";


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

    static errorAlert = (message) => {
        swal.fire({
            title: "Oops!",
            text: `Somethig went wrong while trying to ${message}.`,
            icon: "error",
        });
    }

    static successAlert = (message) => {
        swal.fire({
            title: `${message}!`,
            text: `The blog has been ${message}.`,
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