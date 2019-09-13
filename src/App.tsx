import React, { useState } from 'react';
import './App.css';
import { PageComponentA } from './PageComponentA'
import { ContentStoreProvider, ContentStoreType } from './ContentStoreContext'
import { AuthoringContextProvider } from './AuthoringContext'
import { AuthoringNotice, ContentStoreViewer } from './AuthorableDevTools'

let contentStoreDefaults:ContentStoreType = require('./contentStore.json')

const App: React.FC = () => {
  const [ store, setStore ] = useState(contentStoreDefaults)
  const [ authoring, setAuthoring ] = useState(false);
  return (
    <div className="App">
      <ContentStoreProvider value={[ store, setStore]}>
        <AuthoringContextProvider value={[ authoring, setAuthoring ]}>
          <PageComponentA contentId='pageA' />
          <AuthoringNotice />
          <ContentStoreViewer />
        </AuthoringContextProvider>
      </ContentStoreProvider>
    </div>
  );
}

export default App;
