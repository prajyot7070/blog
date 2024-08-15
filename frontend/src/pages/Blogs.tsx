
import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading, blogs} = useBlogs();
    if (loading) {
        return <div>LOAAADIIINNNGGGGGGGLOAAADIIINNNGGGGGGG</div>
    }
    return <div>
        <AppBar />
        {/* <div className="flex justify-center">
            <div className=" max-w-screen-lg"> */}
                {blogs.map(blog => <BlogCard
                authorname={blog.author.name || "Anonymous"}
                id={blog.id}
                title={blog.title}
                content={blog.content}
                publishdate="13th Aug 2024"
                />)}
                
            </div>
//         </div>

//     </div>
}