import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"

export interface Blog {
    "content": string
    "title": string
    "id": string
    "author": {
        "name": string
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}api/v1/blog/bulk`,{
            headers: {
                authorization: localStorage.getItem("token")
            }
        }).then(response => {
                setBlogs(response.data.allposts);
                setLoading(false);
            })
    }, [])
    return {
        loading,
        blogs
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    console.log(`BACKEND CALL AT :- ${BACKEND_URL}api/v1/blog/${id}`)
    useEffect(() => {
        axios.get(`${BACKEND_URL}api/v1/blog/${id}`, {
            headers: {
                authorization: localStorage.getItem("token")
            },
        }).then((response) => {
            console.log("Response data:", response.data);
            setBlog(response.data); // Assuming the response directly gives you the blog post
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching blog hook:", error);
            if (error.response) {
              console.error("Response data:", error.response.data);
              console.error("Response status:", error.response.status);
              console.error("Response headers:", error.response.headers);
            } else if (error.request) {
              console.error("Request made but no response received:", error.request);
            } else {
              console.error("Error setting up request:", error.message);
            }
            setLoading(false);
          });
      }, [id]);

    return {
        loading,
        blog
    }

}