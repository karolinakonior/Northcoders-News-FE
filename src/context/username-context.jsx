import { createContext, useState } from "react";
import React from "react";

export const UsernameContext = createContext();

export const UsernameProvider = ({children}) => {
    const [username, setUsername] = useState("")

    return (
        <UsernameContext.Provider value={{username, setUsername}}>
            {children}
        </UsernameContext.Provider>
    )
}