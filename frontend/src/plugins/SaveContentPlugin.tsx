import React, {useCallback, useEffect} from 'react';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import { debounce } from '../components/Editor';



function useDebouncedSave(delay: number = 1000){
    const [editor] = useLexicalComposerContext();

    useEffect(()=>{
        const savedContent = localStorage.getItem('editorContent');
        if(savedContent){
            const parsedContent = JSON.parse(savedContent);
            editor.setEditorState(editor.parseEditorState(parsedContent));
        }
    },[editor])

    const saveContent = useCallback(() => {
        editor.update(() => {
            const editorState = editor.getEditorState();
            const json = editorState.toJSON();
            localStorage.setItem('editorContent', JSON.stringify(json));
        });
    }, [editor]);

    const debouncedSaveContent = useCallback(
        debounce(saveContent, delay),
        [saveContent, delay]
    );

    useEffect(()=> {
        return editor.registerUpdateListener(() => {
            debouncedSaveContent();
        });
    }, [editor, debouncedSaveContent]);
};
interface SaveContentPluginProps {
    delay ?: number
}
export const SaveContentPlugin : React.FC<SaveContentPluginProps>  = ({delay = 1000}) => {
    useDebouncedSave(delay);
    return null;
}