import { useState, createContext, useEffect, useContext } from "react";
import { TweetContext } from "./TweetContext";

export const CurrentUserContext = createContext();

    export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [status, setStatus] = useState("loading");
    const {catchError} = useContext(TweetContext)
   
        useEffect(() => {
            
                fetch('/api/me/profile')
                    .then(res => res.json())
                    .then(data => {setCurrentUser(data);
                }).catch(e => {
                    console.log("error", e);
                })
            }, []);
    
    return ( <> <CurrentUserContext.Provider  
        value={{
        currentUser, 
        status, 
    }}>{children}
    </CurrentUserContext.Provider>
    {(catchError !== null) ? "" : ""}
    </>);
};
