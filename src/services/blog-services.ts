
import Blog from "../Blog";
import BlogUtils from "../utils/blog-utils";
import Cookies from "js-cookie"; 


class BlogsServices{

    // fetch Arabic or English blogs based on cached language.
    static fetchBlogs = async (): Promise<any> => {
        const cachedLang: string = Cookies.get("i18next") || "en";
        const response: Response = await fetch(`http://localhost:3000/${cachedLang}`);

        if (!response.ok) {
            throw new Error('Error: Could not fetch the blogs.');
        }
        return response.json();
    };
    
    // fetch from the passed language's endpoint using its id and passed language 
    static fetchBlogById = async (blogId: string, language: string):  Promise<any> => {
        const response: Response = await fetch(`http://localhost:3000/${language}/${blogId}`);

        if (!response.ok) {
            throw new Error('Error: Could not fetch the selected blog.');
        }

        return response.json();
    }
    
    // delete a blog that belongs to the passed language's endpoint using its id 
    static deleteBlog = async (blogId: string, language: string): Promise<void> => {
        const response: Response = await fetch(`http://localhost:3000/${language}/${blogId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error: Could not delete the blog.');
        }
    
    };

    // update a blog that belongs to the passed language's endpoint using its id 
    static updateBlog = async (blogId: string, title: string, description: string, language: string): Promise<void> => {
        const updatedBlog = {
            title: title,
            description: description
        };
    
        const response: Response = await fetch(`http://localhost:3000/${language}/${blogId}`, {
            method: 'PATCH', // partial modification
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBlog)
        });
    
        if (!response.ok) {
            throw new Error('Error: Could not update the blog.');
        }
    
    }

    // add a new blog to the passed language's endpoint
    static addBlog = async (title: string, description: string, language:string): Promise<void> => {

        const currentDate: string = BlogUtils.getCurrentDate();
    
        const newBlog: Blog = {
            title: title,
            description: description,
            date: currentDate,
            isLiked: false
        };
    
        const response: Response = await fetch(`http://localhost:3000/${language}`, {
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