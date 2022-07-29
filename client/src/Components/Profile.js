import styled from "styled-components";
import { useContext, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { GrLocation } from "react-icons/gr";
import { TweetContext } from "../Components/TweetContext";
import {FaHeart} from "react-icons/fa";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import moment from 'moment';
import { CircularProgress } from '@material-ui/core';

const Profile = () => {
  const { tweets, status, sortByDate,getTweetData} = useContext(TweetContext);

  useEffect(() => {
    getTweetData();
    }, [])

    const history = useNavigate();
    
    return (
    <>
    <Div>
    {(status === "idle") ? 
      Object.values(tweets.tweetsById).map((tweet , index) => {
        const date = moment(tweet.author?.joined).format("MMM YY")
      return(
          (tweet.id === "1212689921057665024") ?
        <FirstHalf key={index}> 
            <Main key={index}>
              <Banner src={tweet.author?.bannerSrc} /> 
              <Avatar src={tweet.author?.avatarSrc} /> 
              <Name>{tweet.author?.displayName}</Name>
              <Handle>@{tweet.author?.handle}</Handle>
              <Bio>{tweet.author?.bio}</Bio>
              <Location>
                <LocationIcon><GrLocation /></LocationIcon>{tweet.author?.location}
                <JoinedIcon><GrLocation /></JoinedIcon>Joined {date}  
              </Location>
              <Following><Follow>{tweet.author?.numFollowing}</Follow> Following
              <Follower>{tweet.author?.numFollowers}</Follower> Followers</Following>
              <UL>
                <LI style={{color: "blue",borderBottom: "blue solid 1px"}}>Tweets</LI>
                <LI style={{color: "black"}}>Media</LI>
                <LI style={{color: "black"}}>Likes</LI>
              </UL>  
            </Main>
      </FirstHalf> :  ""
      )}) : <Loading><CircularProgress /></Loading>}

      
        {(status === "idle") ? 
          Object.values(tweets.tweetsById).sort(sortByDate).map((tweet , index) => {
          const date = moment(tweet.author?.joined).format("MMM YY")
          return(
              (tweet.author?.handle === "treasurymog") ?
              <div key={index}>
                <TweetInfo key={index}>
                    <Mainn onClick={() => {history(`/tweet/${tweet.id}`);}}>
                      <Retweet>
                        {tweet.retweetFrom !== undefined && <p><AiOutlineRetweet/> {tweet.retweetFrom.displayName} {"Remeowed"}</p>}
                      </Retweet>
                      <div>
                      <Avatarr src={tweet.author?.avatarSrc}></Avatarr>
                      </div>
                      <div>
                        
                      <Names onClick={(e) => {
                  e.preventDefault(); 
                  e.stopPropagation();
                  history(`/${tweet.author.handle}`);}}>{tweet.author?.displayName}</Names> 
                        <span> @ {tweet.author?.handle}</span>
                        <span> - {date}</span>  
                      
                        <Div22>{tweet.author?.handle}</Div22>
                        <Bio>{tweet?.status}</Bio>
                        
                        {(tweet?.media[0] === undefined) ? "" : <Img src={tweet?.media[0].url}></Img>}
                        
                        <Icons>
                          <SpanIcons><BiMessageRounded /></SpanIcons>
                          <SpanIcons><AiOutlineRetweet/></SpanIcons>
                          <HeartIcon liked={tweet.isLiked} ><FaHeart/></HeartIcon>
                          <SpanIcons><BiUpload/></SpanIcons>
                        </Icons>
                      </div> 
                    </Mainn> 
                  </TweetInfo>
              </div> :  ""
                        
          )}) : ""}
        </Div>
    </>
    );
  };

export default Profile;

const Div = styled.div`
float: right;
width: 67%;
`

const FirstHalf = styled.div`
width: 100%;
`

const Main = styled.div`
border-left: 1px solid silver;
border-right: 1px solid silver;
position: relative;
`

const Retweet = styled.div`
margin: 2px 0px 7px 15px;
`

const Banner = styled.img`
width: 100%;
`

const Avatar = styled.img`
width: 15%;
border-radius: 50%;
margin-right: 10px;
position: absolute;
top: 35%;
left: 2%;
`
const Name = styled.p`
font-weight: bolder;
margin-left: 10px;
margin-top: 60px;
font-size: 25px;
`

const Handle = styled.p`
margin-left: 10px;
margin-top: 8px;
`

const Bio = styled.p`
font-weight: bold;
margin-left: 10px;
padding: 10px 0px;
`

const Location = styled.span`
margin-left: 10px;
`

const LocationIcon = styled.span`
margin-right: 3px;
`

const Follow = styled.span`
font-weight: bolder;
`

const Follower = styled.span`
margin-left: 15px;
font-weight: bolder;
`

const JoinedIcon = styled.span`
margin-left: 15px;
`

const Following = styled.p`
margin-left: 10px;
margin-top: 10px;
`

const Loading =styled.div`
padding-top: 20px;
font-size: 40px;
width: 30%;
margin: auto;
`

const UL = styled.ul`
display: flex;
margin-top: 20px;
`

const LI = styled.li`
padding: 3% 12%;
list-style: none;
`

const Avatarr = styled.img`
width: 6%;
display: flex;
float: left;
border-radius: 50%;
margin-right: 10px;
`

const Names = styled.span`
font-weight: bolder;
font-size: 23px;
cursor: pointer;
`

const TweetInfo = styled.div`
text-decoration: none;
`

const Mainn = styled.div`
padding: 2%;
border-left: 1px solid silver;
border-right: 1px solid silver;
border-bottom: 5px solid silver;
text-decoration: none;
cursor: pointer;
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

const Div22 = styled.h3`
padding: 0%;
margin: 0%;
`