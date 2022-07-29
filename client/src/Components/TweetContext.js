import { useState, createContext } from "react";

export const TweetContext = createContext();

    export const TweetProvider = ({ children }) => {
    const [tweets, setTweets] = useState(null);
    const [status, setStatus] = useState("loading");
    const [catchError , setCatchError] = useState(null);

    const getTweetData = () => {
            fetch('/api/me/home-feed')
                .then(res =>  res.json())
                .then(data => {
                    setTweets(data);
                    setStatus("idle");
            }).catch(e => {
                console.log("error", e);
                setCatchError(e)
            })
    }

    const likeATweet =(id )=> {
        const newObj = {...tweets.tweetsById}
        newObj[id]= {...newObj[id], isLiked: !newObj[id].isLiked}
        setTweets({
            ...tweets, 
            tweetsById: newObj,
        })
    }

    const sortByDate = (a, b) => {
        return new Date(b.timestamp).valueOf() - 
        new Date(a.timestamp).valueOf(); 
    }

    return (  <TweetContext.Provider  
        value={{
            tweets, 
        status, 
        catchError,
        getTweetData,
        sortByDate,
        likeATweet
    }}>{children}
    </TweetContext.Provider>);
};
