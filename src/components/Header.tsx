import React, { useState } from 'react';
import { AuthoredComponent } from "../Authorable";
import { useContentEditor, useContent } from "../ContentStore";
import { AuthorableArea } from "../AuthorableArea";

const HeaderContentType = 'Header'

const HeaderAuthorDialog:React.FC<{
  defaultContent: string,
  close: () => void
} & AuthoredComponent> = (props) => {
  const [ , saveContent ] = useContentEditor<string>(HeaderContentType, props.contentId);
  const [ workingText, setWorkingText ] = useState(props.defaultContent);
  return <div key='dialog'><input onChange={(e) => {
    setWorkingText(e.currentTarget.value)
  }} value={workingText} /><button onClick={() => {
    saveContent(workingText)
    props.close();
    console.log('Close dialog');
  }}>Submit</button><br/></div>
}

export const AuthoredHeader:React.FC<{
  defaultText: string
} & AuthoredComponent> = (props) => {
  const [ loading, error, content ] = useContent(HeaderContentType, props.contentId, props.defaultText);
  if (loading) {
    return <h1>Loading content...</h1>
  }
  return <AuthorableArea contentId={props.contentId} dialog={HeaderAuthorDialog} defaultContent={content} error={error}>
    <h1>{content}</h1>
  </AuthorableArea>
}