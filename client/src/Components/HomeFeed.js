import Tweet from "../Components/Tweet";
import NewTweet from "./NewTweet";
import styled from "styled-components";
import { TweetContext } from "./TweetContext";
import { useContext } from "react";
import ErrorPage from "./ErrorPage";

const HomeFeed = () => {
  const {catchError} = useContext(TweetContext);
    return (
    <>
      {(catchError !== null) ? 
      <ErrorPage /> :
      <>
        <Div>
        <NewTweet />
            <Tweet />
        </Div>
    </>}
    </>)
  };

export default HomeFeed;

const Div = styled.div`
float: right;
width: 67%;
`