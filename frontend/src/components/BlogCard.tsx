import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate if you're using React Router
import { format, isValid } from 'date-fns';


function extractPlainTextFromLexicalJson(content: string, wordLimit: number = 25): string {
  try {
    const contentObj = JSON.parse(content);
    let plainText = '';
    let wordCount = 0;

    function traverse(node: any) {
      if (node.type === 'text') {
        const words = node.text.split(/\s+/); // Split text into words
        for (const word of words) {
          if (wordCount >= wordLimit) break;
          plainText += word + ' ';
          wordCount++;
        }
      } else if (node.children && node.children.length > 0) {
        for (const child of node.children) {
          if (wordCount >= wordLimit) break;
          traverse(child);
        }
      }
    }

    traverse(contentObj.root);
    return plainText.trim() + (wordCount >= wordLimit ? '...' : '');
  } catch (error) {
    console.error("Error parsing Lexical JSON:", error);
    return content; // Return original content in case of error
  }
}

interface BlogCardProps {
    authorname: string;
    title: string;
    id: string;
    content: string;
    publishdate: Date;
}

export const BlogCard = (
{   authorname,
    title,
    id,
    content,
    publishdate}: BlogCardProps) => {


      const displayName = authorname || "Unknown Author";
      const plainText = extractPlainTextFromLexicalJson(content);

      
      return (
            <Link to={`/blog/${id}`}>
            <div className="flex justify-center">
              <div className="border-b pt-5 w-full max-w-2xl"> {/* Adjusted the width and centered */}
                <div className="flex items-center pb-3">
                  <Avatar name={displayName} />
                  <div className="ml-3">
                    <div className="font-medium text-slate-500">{displayName}</div>
                    <div className="text-sm font-thin text-slate-600">{}</div>
                  </div>
                </div>
                <div className="text-xl font-bold pt-2">{title}</div>
                <div className="text-m font-medium pt-2">
                  {plainText}
                </div>
                <div className="text-gray-400 py-3">
                  {`${Math.ceil(content.length / 100)} minute(s)`}
                </div>
              </div>
            </div>
            </Link>
          );
}

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500">

  </div>
}


export function Avatar({ name, size = "small" }: { name?: string; size?: "small" | "big" }) {
  const initial = name ? name[0].toUpperCase() : "?";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleDropdown = () => {
    if (size === "big") {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");

    // Optionally, navigate the user to the login page or home page
    navigate("/login"); // Adjust the path as needed
  };

  return (
    <div className="relative">
      <div
        onClick={toggleDropdown}
        className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer ${
          size === "small" ? "w-6 h-6" : "w-10 h-10"
        }`}
      >
        <span className={`${size === "small" ? "text-xs" : "text-s"} text-gray-600 dark:text-gray-300`}>
          {initial}
        </span>
      </div>

      {isDropdownOpen && size === "big" && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
