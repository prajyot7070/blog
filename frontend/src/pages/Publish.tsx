import { AppBar } from "../components/AppBar"
import { Editor } from "../components/Editor"


export const Publish = () => {
    return <div>
        <AppBar type="publish"/>
        <div className="editor-container-publish">
        <Editor />
        </div>
        
    </div>
}