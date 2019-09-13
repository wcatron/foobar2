import { useState, useEffect, useContext } from 'react';
import ContentStoreContext, { ContentStoreType } from './ContentStoreContext';
import AuthoringContext from './AuthoringContext';

function getContentPath(contentType: string, id: string) {
  const path = window.location.pathname;
  return `${path}:${contentType}:${id}`
}

async function fetchContentByID(contentType: string, id: string, contentStore: ContentStoreType) {
  const path = getContentPath(contentType, id);
  if (path in contentStore) {
    try {
      return JSON.parse(contentStore[path])
    } catch (e) {
      return contentStore[path];
    }
  }
  throw new Error(`Could not find content for ${id} in ${path}`);
}

async function updateContentById(contentType: string, contentId: string, value: any, contentStore: ContentStoreType, setContentStore:(value: ContentStoreType) => void) {
  setContentStore({
    ...contentStore,
    [getContentPath(contentType, contentId)]: JSON.stringify(value)
  })
}

async function cleanContentById(contentType: string, contentId: string, contentStore: ContentStoreType, setContentStore:(value: ContentStoreType) => void) {
  let newStore = Object.assign({}, contentStore);
  delete newStore[getContentPath(contentType, contentId)];
  setContentStore(newStore);
}

export function useContent<T>(contentType: string, id: string, defaultValue: T):[boolean, any, T] {
  const [ store ] = useContext(ContentStoreContext)
  const [ content, setContent ] = useState<T>(defaultValue);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState<any>(null)

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      try {
        const content = await fetchContentByID(contentType, id, store);
        setContent(content);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };
  
    fetchContent();
  }, [ contentType, id, store ])

  return [ loading, error, content ];
}

export function useContentEditor<T>(contentType: string, contentId: string):[boolean, (content:T) => void] {
  const [ isAuthoring ] = useContext(AuthoringContext);
  const [ store, setContent ] = useContext(ContentStoreContext)
  return [ isAuthoring, (content: T) => {
    updateContentById(contentType, contentId, content, store, setContent);
  }]
}