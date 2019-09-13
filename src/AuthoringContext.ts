import React from 'react'


const AuthoringContext = React.createContext<[boolean, (value: boolean) => void]>([false, () => {}])

export const AuthoringContextProvider = AuthoringContext.Provider
export const AuthoringContextConsumer = AuthoringContext.Consumer
export default AuthoringContext