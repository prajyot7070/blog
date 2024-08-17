import {$getRoot, $getSelection} from 'lexical';
import React, {useCallback, useEffect, useState} from 'react';
import '../styles.css'
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';

import ToolbarPlugin from '../plugins/ToolbarPlugin';
import { SaveContentPlugin } from '../plugins/SaveContentPlugin';
import { AppBar } from './AppBar';

// const theme = {
//   // Theme styling goes here
//   //...
//   ExampleTheme
// }

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
// function onError(error: any) {
//   console.error(error);
// }

const placeholder = 'Type something . . .';
const editorConfig = {
    namespace: 'React.js Demo',
    nodes: [],
    // Handling of errors during update
    onError(error: Error) {
      throw error;
    },
  }

// Creating a Generic T that is a func thta can take variable amt of args of : any[] type that return void
// pass (func: T , delay number) as argument types which are of type 
// : (...args: Parameters<T>) => returns void
export function debounce<T extends (...args: any[]) => void>(func:T, delay:number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay)
    };
}


export const Editor = () =>  {
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        const savedTitle = localStorage.getItem('editorTitle');
        if(savedTitle) {
            setTitle(savedTitle);
        }
    }, [])

    const debouncedSaveTitle = useCallback(
        debounce((newTitle: string) => {
            localStorage.setItem('editorTitle', newTitle);
        }, 1000),
        []
    );

    const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
        debouncedSaveTitle(e.target.value);
    }, []);



  return (
    
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className='grow-wrap'>
        {/* Title Input */}
        <textarea
          className="editor-title-input"
          placeholder="| Title"
          value={title}
          rows={1}
          onChange={handleTitleChange}
        />
        </div>
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="editor-placeholder">{placeholder}</div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <SaveContentPlugin delay={1000}/>
        </div>
      </div>
    </LexicalComposer>
  );
}