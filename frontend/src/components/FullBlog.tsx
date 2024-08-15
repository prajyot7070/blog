import { AppBar } from "./AppBar"
import { Blog } from "../hooks"
export const FullBlog = ({blog}: {blog: Blog }) => {
    console.log(`blog.tsx - BLOG :- ${blog}`)
    return <div>
    <AppBar />
        <div className="grid grid-cols-12 px-10 w-full pt-200">
            <div className="bg-red-200 col-span-8">
                <div className="text-3xl font-extrabold">
                    {blog.title}
                </div>
            </div>
        <div className="bg-blue-200 col-span-4">
            Hello
        </div>
</div>
</div>
    
}