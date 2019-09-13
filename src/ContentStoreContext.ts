import React from 'react'

export type ContentStoreType = {[key:string]:string};

const ContentStoreContext = React.createContext<[ContentStoreType, (value: ContentStoreType) => void]>([{}, () => {}])

export const ContentStoreProvider = ContentStoreContext.Provider
export const ContentStoreConsumer = ContentStoreContext.Consumer
export default ContentStoreContext