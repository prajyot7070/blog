import {useEffect} from 'react';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';

export const LoadContentPlugin = () => {
    const [editor] = useLexicalComposerContext();
  
    useEffect(() => {
      const savedState = localStorage.getItem('editorContent');
      if (savedState) {
        editor.update(() => {
          const editorState = editor.parseEditorState(savedState);
          editor.setEditorState(editorState);
        });
      }
    }, [editor]);
  
    return null;
  };