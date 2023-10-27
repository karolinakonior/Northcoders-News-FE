import { createContext, useState } from "react";
import React from "react";

export const TopicContext = createContext();

export const TopicProvider = ({children}) => {
    const [topics, setTopics] = useState("")

    return (
        <TopicContext.Provider value={{topics, setTopics}}>
            {children}
        </TopicContext.Provider>
    )
}