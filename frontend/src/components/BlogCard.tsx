import { Link } from "react-router-dom";

interface BlogCardProps {
    authorname: string;
    title: string;
    id: string;
    content: string;
    publishdate: string;
}

export const BlogCard = (
{    authorname,
    title,
    id,
    content,
    publishdate}: BlogCardProps) => {
        return (
            <Link to={`/blog/${id}`}>
            <div className="flex justify-center">
              <div className="border-b pt-5 w-full max-w-2xl"> {/* Adjusted the width and centered */}
                <div className="flex items-center pb-3">
                  <Avatar name={authorname} />
                  <div className="ml-3">
                    <div className="font-medium text-slate-500">{authorname}</div>
                    <div className="text-sm font-thin text-slate-600">{publishdate}</div>
                  </div>
                </div>
                <div className="text-xl font-bold pt-2">{title}</div>
                <div className="text-m font-medium pt-2">
                  {content.slice(0, 150) + "..."}
                </div>
                <div className="text-gray-400 py-3">
                  {`${Math.ceil(content.length / 100)} minute(s)`}
                </div>
              </div>
            </div>
            </Link>
          );
}

export function Avatar({name, size = "small"}: {name: string, size? : "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
        <span className={`${size === "small" ? "text-xs" : "text-s"} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
    </div>
    
}