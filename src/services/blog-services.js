import BlogUtils from "../utils/blog-utils";

class BlogsServices{

    static fetchBlogs = async () => {
        const response = await fetch('http://localhost:3000/blogs');
        if (!response.ok) {
            throw new Error('Error: Could not fetch the blogs.');
        }
        return response.json();
    };
    
    static fetchBlogById = async (blogId) => {
        const response = await fetch(`http://localhost:3000/blogs/${blogId}`);
        if (!response.ok) {
            throw new Error('Error: Could not fetch the selected blog.');
        }
        return response.json();
    }
    
    
    static deleteBlog = async (blogId) => {
        const response = await fetch(`http://localhost:3000/blogs/${blogId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error: Could not delete the blog.');
        }
    
    };
    
    static updateBlog = async (blogId, title, description) => {
        const updatedBlog = {
            title: title,
            description: description
        };
    
        const response = await fetch(`http://localhost:3000/blogs/${blogId}`, {
            method: 'PATCH', //partial modification
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBlog)
        });
    
        if (!response.ok) {
            throw new Error('Error: Could not update the blog.' + response.Error);
        }
    
    }

    static addBlog = async (title, description) => {

        const currentDate = BlogUtils.getCurrentDate();
    
        const newBlog = {
            title: title,
            description: description,
            date: currentDate,
            isLiked: false
        };
    
        const response = await fetch('http://localhost:3000/blogs', {
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