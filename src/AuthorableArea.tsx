import React, { useState, useContext, useEffect } from 'react';
import AuthoringContext from './AuthoringContext';
import { AuthoredComponent } from './Authorable';
import { useContentEditor } from './ContentStore';

type AuthoredDialog = {
  defaultContent: any,
  error: any,
  close: () => void
} & AuthoredComponent;

const DefaultDialog:React.FC<AuthoredDialog> = (props) => {
  const [ , saveContent ] = useContentEditor<string>(props.contentType!, props.contentId);
  const [ json, setJson ] = useState(JSON.stringify(props.defaultContent));
  return <div>
    <textarea onChange={(e) => {
      setJson(e.currentTarget.value);
    }} value={json} />
     <button onClick={() => {
       try {
        saveContent(JSON.parse(json));
       } catch(error) {
        alert(error)
       } finally {
        props.close()
       }
    }}>Save</button>
  </div>
}

export const AuthorableArea:React.FC<{
  contentId: string,
  contentType?: string,
  error?: any,
  dialog?: React.FC<AuthoredDialog>,
  defaultContent: any
}> = (props) => {
  const [ authoring ] = useContext(AuthoringContext);
  const [ hovering, setHovering ] = useState(false);
  const [ isAuthoring, setAuthoring ] = useState(false);

  useEffect(() => {
    if (authoring === false) {
      setHovering(false);
      setAuthoring(false);
    }
  }, [ authoring ])

  const Dialog = props.dialog || DefaultDialog;
  if (authoring) {
    return (<div id={'AuthorableArea'+props.contentId} style={hovering ? {
      outline: 4,
      outlineColor: 'yellow',
      outlineStyle: 'solid'
    } : {}} onMouseOver={() => {
      setHovering(true)
    }} onMouseOut={() => {
      setHovering(false)
    }} onClick={(e) => {
      e.stopPropagation()
      if (!isAuthoring) {
        setAuthoring(true);
      }
    }}>
      <div>{props.children}</div>
      {props.error ? <div>Error loading content: {JSON.stringify(props.error)}</div> : null}
      {isAuthoring ? <div><Dialog key='dialog' defaultContent={props.defaultContent} error={props.error} contentType={props.contentType} contentId={props.contentId} close={() => { setAuthoring(false); setHovering(false); }} /></div> : null}</div>)
  } else {
    return <>{props.children}</>
  }
}