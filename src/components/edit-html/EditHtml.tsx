import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import  './EditHtml.scss'
export const EditHtml:React.FC<{eventFormInput:{ [key: string]: number | string | boolean | Date},setEventFormInput:any}>=({setEventFormInput,eventFormInput})=> {
    const editorRef:any = useRef(null);
    const log = (e:any) => {
        e.preventDefault()
        if (editorRef.current) {
            setEventFormInput({...eventFormInput, "comments": editorRef.current.getContent() as string | number})
            console.log(editorRef.current.getContent());
        }
    };
    return (
        <>
            <Editor
                onChange={log}
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={`${eventFormInput["comments"] as string}`}//"<p>Type a comments...</p>"
                init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                        'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
                        'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
                        'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
                    ],
                    toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        </>
    );
}