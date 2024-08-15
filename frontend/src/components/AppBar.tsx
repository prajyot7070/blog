import { Avatar } from "./BlogCard"
export const AppBar = () =>{
    return <div className="border-b flex justify-between px-10 py-3">
        <div className="flex justify-center flex-col font-bold text-xl">BlogDatShiii . . .</div>
        <div> <Avatar size="big" name="Prajyot"/></div>
    </div>
}