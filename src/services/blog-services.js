
import BlogUtils from "../utils/blog-utils";
import Cookies from "js-cookie"; 
import i18n from "../i18n";

class BlogsServices{

    // fetch Arabic or English blogs based on cached language.
    static fetchBlogs = async () => {
        const cachedLang = Cookies.get("i18next") || "en";
        const response = await fetch(`http://localhost:3000/${cachedLang}`);

        if (!response.ok) {
            throw new Error('Error: Could not fetch the blogs.');
        }
        return response.json();
    };
    
    // fetch from the passed language's endpoint using its id and passed language 
    static fetchBlogById = async (blogId, language) => {
        const response = await fetch(`http://localhost:3000/${language}/${blogId}`);

        if (!response.ok) {
            throw new Error('Error: Could not fetch the selected blog.');
        }

        return response.json();
    }
    
    // delete a blog that belongs to the passed language's endpoint using its id 
    static deleteBlog = async (blogId, language) => {
        const response = await fetch(`http://localhost:3000/${language}/${blogId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error: Could not delete the blog.');
        }
    
    };

    // update a blog that belongs to the passed language's endpoint using its id 
    static updateBlog = async (blogId, title, description, language) => {
        const updatedBlog = {
            title: title,
            description: description
        };
    
        const response = await fetch(`http://localhost:3000/${language}/${blogId}`, {
            method: 'PATCH', // partial modification
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBlog)
        });
    
        if (!response.ok) {
            throw new Error('Error: Could not update the blog.' + response.Error);
        }
    
    }

    // add a new blog to the passed language's endpoint
    static addBlog = async (title, description, language) => {

        const currentDate = BlogUtils.getCurrentDate();
    
        const newBlog = {
            title: title,
            description: description,
            date: currentDate,
            isLiked: false
        };
    
        const response = await fetch(`http://localhost:3000/${language}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBlog)
        });

        if (!response.ok) {
            throw new Error('Error: Could not add the blog.');
        }
    }
}

export default BlogsServices;