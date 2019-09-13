import React, { useContext } from 'react';
import AuthoringContext from './AuthoringContext';
import ContentStoreContext from './ContentStoreContext';

export const AuthoringNotice:React.FC = () => {
  const [ authoring ] = useContext(AuthoringContext);
  return authoring ? <div style={{ position:'absolute', top:0,left:0, width:'100%', background: 'gray' }}>In authoring mode</div> : null;
}

export const ContentStoreViewer:React.FC = () => {
  const [ authoring, setAuthoring ] = useContext(AuthoringContext);
  const [ store ] = useContext(ContentStoreContext);

  return <div style={{position:'absolute', bottom:0, background:'lightgray', width: '100%'}}>
  <div><button onClick={() => {
    setAuthoring(!authoring)
  }}>Toggle Authoring Mode</button></div>
    <h3>Content Store</h3>
    <p>{JSON.stringify(store)}</p>
  </div>
}