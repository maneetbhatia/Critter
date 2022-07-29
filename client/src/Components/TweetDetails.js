import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TweetContext } from "../Components/TweetContext";
import { BiMessageRounded, BiArrowBack, BiUpload } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import {FaHeart} from "react-icons/fa";
import moment from 'moment';
import { CircularProgress } from '@material-ui/core';
import ErrorPage from "./ErrorPage";
import { useEffect } from "react";


const TweetDetails = () => {
  const { tweets, getTweetData, status} = useContext(TweetContext);
  const { tweetId } = useParams();
  const history = useNavigate();

  
  useEffect(() => {
    getTweetData()
  },[])

    return (
      <>
      {(status === "idle") ? 
          <>
            {(status === "idle") ?
              <Div>
                <TweetInfo>
                  <div>
                  <ButtonMain onClick={() => {history(`/`);}}><BiArrowBack /></ButtonMain>
                  <Heading>Meow</Heading>
                  </div>
                  <Main>
                    <div>
                    <Avatar src={tweets.tweetsById[tweetId].author?.avatarSrc}></Avatar>
                    </div>
                    <div>
                    <Name>{tweets.tweetsById[tweetId].author?.displayName}</Name>
                      <div> @{tweets.tweetsById[tweetId].author?.handle}</div>
                      
                      <Bio>{tweets.tweetsById[tweetId]?.status}</Bio>
                      {(tweets.tweetsById[tweetId]?.media[0] === undefined) ? "" : <Img src={tweets.tweetsById[tweetId]?.media[0].url}></Img>}
                      <Joined> {moment(tweets.tweetsById[tweetId].author.joined).format("LT - ll")} <span>{": Critter web app"}</span></Joined>
                      <Icons>
                        <SpanIcons><BiMessageRounded /></SpanIcons>
                        <SpanIcons><AiOutlineRetweet/></SpanIcons>
                        <HeartIcon><FaHeart/>
                          </HeartIcon>
                        <SpanIcons><BiUpload/></SpanIcons>
                      </Icons>
                    </div> 
                  </Main>
                </TweetInfo> 
              </Div>
            : <Loading><CircularProgress /></Loading>}
          </>
      : <ErrorPage />}
    
    </>
    );
  };

export default TweetDetails;

const Div = styled.div`
float: right;
width: 67%;
`
const Heading =styled.h1`
  border-bottom: 1px solid silver;
`
const ButtonMain =styled.button`
  float: left;
  background-color: white;
  border: none;
  margin: 7px 12px;
  font-size: large;
  cursor: pointer;
`

const Joined = styled.div`
padding: 3% 0%;
border-bottom: 0.5px solid silver;
`

const TweetInfo = styled.div`
`

const Loading =styled.div`
padding-top: 20px;
font-size: 40px;
width: 30%;
margin: auto;
`

const Main = styled.div`
padding: 2%;
border-left: 1px solid silver;
border-right: 1px solid silver;
border-bottom: 5px solid silver;
`

const Icons = styled.div`
margin: 2% 8%;
`
const SpanIcons = styled.span`
padding: 20px 110px 20px 0px;
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

const Bio = styled.h3`
padding: 0%;
margin-top: 5%;
`

const Avatar = styled.img`
width: 7%;
display: flex;
float: left;
border-radius: 50%;
margin-right: 10px;
`

const Name = styled.span`
font-weight: bolder;
font-size: 23px;
`