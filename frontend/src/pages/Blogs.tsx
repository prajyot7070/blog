
import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton"

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            <AppBar type="" /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }
    return <div>
        <AppBar type=""/>
        {/* <div className="flex justify-center">
            <div className=" max-w-screen-lg"> */}
                {blogs.map(blog => <BlogCard
                key={blog.id}
                authorname={blog.author.name || "Anonymous"}
                id={blog.id}
                title={blog.title}
                content={blog.content}
                publishdate={blog.publishedAt}
                />)}
                
            </div>
//         </div>

//     </div>
}