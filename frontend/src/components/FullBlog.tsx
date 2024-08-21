import { AppBar } from "./AppBar"
import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"
import { BlogRenderer } from "./BlogRenderer"
export const FullBlog = ({blog}: {blog: Blog }) => {
    console.log(`blog.tsx - BLOG :- ${JSON.stringify(blog)}`)
    const authorName = blog.author.name || "Unknown Author";
    return <div>
            <AppBar type=""/>
                <div className="flex justify-center">
                    <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-10">
                        <div className="col-span-8">
                            <div className="text-3xl font-extrabold">
                                {blog.title}
                            </div>
                            <div className="text-slate-500 pt-4">
                                {blog.publishedAt}
                            </div>
                            <div className="pt-6 pr-10">
                                <BlogRenderer content={blog.content}/>
                            </div>
                        </div>
                        <div className="col-span-4">
                            Author
                            <div className="flex w-full">
                                
                                <div className="pr-2 flex flex-col justify-center">
                                    <Avatar size="big" name={authorName}/>
                                </div>
                                <div>
                                    <div className="text-xl font-bold col-span-4">
                                            {authorName}
                                        </div>
                                        <div className="pt-2 text-slate-500">
                                            Random Catch phrase about the author's ability to grab the user's attention
                                        </div>

                                </div>
                                    
                            </div>
                        </div>
                </div>
            </div>
        </div>
            
        }