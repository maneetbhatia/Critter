import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { TweetContext } from "../Components/TweetContext";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import {FaHeart} from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import {useNavigate} from 'react-router-dom';
import moment from 'moment';
import { CircularProgress } from '@material-ui/core';

const Tweet = () => {
  const { tweets, status, sortByDate,likeATweet} = useContext(TweetContext);
  const [isLoading, setIsLoading] = useState(false);

  const history = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    return () => clearTimeout(timeout);
  },[]);


  return (
    <>
      {(isLoading === true) ? 
      <>
        {(status === "idle") ? 
        Object.values(tweets.tweetsById).sort(sortByDate).map((tweet , index) => {
          const date = moment(tweet.author.joined).format("MMM YY");

          return(
          <TweetInfo key={index}>
            <Main onClick={() => {history(`/tweet/${tweet.id}`);}}>
              <Retweet>
                {tweet.retweetFrom !== undefined && <p><AiOutlineRetweet/> {tweet.retweetFrom.displayName} {"Remeowed"}</p>}
              </Retweet>
              <div>
              <Avatar src={tweet.author.avatarSrc}></Avatar>
              </div>
              <div>
                <Name onClick={(e) => {
                  e.preventDefault(); 
                  e.stopPropagation();
                  history(`/${tweet.author.handle}`);}}>{tweet.author.displayName}</Name>
              
                <span> @{tweet.author.handle}</span>
                <span> - {date}</span> 
              
                <Div2>{tweet.status}</Div2>
                {(tweet.media[0] === undefined) ? "" : 
                <Img src={tweet.media[0].url}></Img>}
                <Icons>
                  <SpanIcons><BiMessageRounded /></SpanIcons>
                  <SpanIcons><AiOutlineRetweet/></SpanIcons>
                  <HeartIcon liked={tweet.isLiked} 
                    onClick={(e) => {
                      e.preventDefault(); 
                      e.stopPropagation();
                      likeATweet(tweet?.id)
                  }}><FaHeart/>
                  </HeartIcon>
                  <SpanIcons><BiUpload/></SpanIcons>
                </Icons>
              </div> 
            </Main>
            
          </TweetInfo> )})  :  ""}
          </>
          : <Loading><CircularProgress /></Loading>}
    
    </>
    )
  };

export default Tweet;

const TweetInfo = styled.div`
text-decoration: none;
`

const Main = styled.div`
padding: 2%;
border-left: 1px solid silver;
border-right: 1px solid silver;
border-bottom: 5px solid silver;
text-decoration: none;
cursor: pointer;
`

const Retweet = styled.div`
margin: 2px 0px 7px 15px;
`

const Loading =styled.div`
padding-top: 20px;
font-size: 40px;
width: 30%;
margin: auto;
`

const Icons = styled.div`
padding: 3% 3%;
`
const SpanIcons = styled.span`
margin: 20% 20% 20% 0%;
`

const HeartIcon = styled.span`
margin: 20% 20% 20% 0%;
color: ${props => (props.liked) ? "red" : "silver" };
`

const Img = styled.img`
width: 100%;
height: 35rem;
border-radius: 5%;
`
const Avatar = styled.img`
width: 6%;
display: flex;
float: left;
border-radius: 50%;
margin-right: 10px;
`

const Div2 = styled.h3`
flex: end;
margin-top: 30px;
padding: 10px 0px;
`


const Name = styled.span`
font-weight: bolder;
font-size: 23px;
cursor: pointer;
z-index: 1000;
`