import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useCallback, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { CreateBlogInput } from "@prajyot_mane/blogapp-commons";

export const AppBar = ({type}: {type: "publish" | ""}) => {
    const navigate = useNavigate();
    const [createBlogInput, setCreateBlogInput] = useState<CreateBlogInput>();
    const handlePublish = useCallback(async () => {
        // Assuming you have access to the title and content
        const title = localStorage.getItem('editorTitle') || "Untitled";
        const content = localStorage.getItem('editorContent') || "";
        const token = localStorage.getItem('token');
        setCreateBlogInput({
            title: title,
            content: content
        })

        if (content === "") {
            alert("No content to publish!");
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog/create`, createBlogInput, {
                headers: {
                    'Authorization':token
                }
            });

            navigate("/blogs")
        } catch (error) {
            console.error("Error publishing blog:", error);
            alert("An error occurred while publishing the blog.");
        }
    }, [navigate]);

    return (
        <div className="border-b flex justify-between px-10 py-3">
            <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer font-bold text-xl">
                BlogDatShiii . . .
            </Link>
            {type === 'publish' ? (
                <button 
                    type="button" 
                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={handlePublish}
                >
                    Publish
                </button>
            ) : (
                <Link to={'/publish'}>
                    <button 
                        type="button" 
                        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Create
                    </button>
                </Link>
            )}
            <div><Avatar size="big" name="Prajyot"/></div>
        </div>
    );
};
