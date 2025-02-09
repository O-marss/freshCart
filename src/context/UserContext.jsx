import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'

export let UserContext = createContext();

export default function UserContextProvider({children}) {

  const [userToken, setUserToken] = useState(null);
  const [userName, setUserName] = useState(null)

  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      setUserToken(localStorage.getItem('userToken'))
      setUserName(localStorage.getItem('userName'))
    }
  },[])

  return (
    <UserContext.Provider value={{userToken, setUserToken, userName, setUserName}}>
        {children}
    </UserContext.Provider>
  )
}
