import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import React, { useEffect } from "react";

const LoadContent: React.FC<{content: string}> = ({content}) => {
    const [ editor ] = useLexicalComposerContext();
    useEffect(() => {
      editor.update(() => {
        let parsedContent;
        try {
          parsedContent = JSON.parse(content);
        } catch {
          // If it's not JSON, use it as is
          parsedContent = content;
        }
        const editorState = editor.parseEditorState(parsedContent);
        editor.setEditorState(editorState);
      });
    }, [editor, content]);
    return null;
  }

interface BlogRendererProps {
    content : string;
}

export const BlogRenderer: React.FC<BlogRendererProps> = ({content}) => {
    const initialConfig = {
        editable: false,
        namespace: 'BlogRenderer',
        onError: (error: Error) => console.error(error)
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-container">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<div className="editor-placeholder">No content to display...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <LoadContent content={content} />
        </div>
      </LexicalComposer>
    )
}