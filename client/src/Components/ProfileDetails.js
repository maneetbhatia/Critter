import { TweetContext } from "./TweetContext";
import { useContext } from "react";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import {FaHeart} from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import styled from "styled-components";
import moment from 'moment';
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";
import { useState, useEffect } from "react";
import { CircularProgress } from '@material-ui/core';


const ProfileDetails = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [isLoading, setIsLoading] = useState("loading")
  const { tweets, status, sortByDate, likeATweet, getTweetData} = useContext(TweetContext);
  const { tweetHandle } = useParams();

const history = useNavigate();

const getProfileData = () => {
          fetch(`/api/${tweetHandle}/profile`)
              .then(res => res.json())
              .then(data => {setIsLoading("idle"); setProfileInfo(data);

          }).catch(e => {
              console.log("error", e)
          })
    }

    useEffect(() => {
      getProfileData();
      getTweetData();
    }, [])

    return(
      <>
      <Div>
      {(isLoading === "idle") ? 
        <div> 
            <Main>
              <Banner src={profileInfo.profile?.bannerSrc} /> 
              <Avatar src={profileInfo.profile?.avatarSrc} /> 
              <Name>{profileInfo.profile?.displayName}</Name>
              <Handle>@{profileInfo.profile?.handle} {profileInfo.profile.isFollowingYou === true && " Follows you"}</Handle>
              <Bio>{profileInfo.profile?.bio} </Bio>
              <Location>
              {profileInfo.profile?.location !== undefined && <JoinedIcon><GrLocation /></JoinedIcon>} {profileInfo.profile?.location} 
                <JoinedIcon><AiOutlineCalendar /></JoinedIcon>Joined {moment(profileInfo.profile?.joined).format("MMMM YY")}  
              </Location>
              <Following><Follow>{profileInfo.profile?.numFollowing}</Follow> Following
              <Follower>{profileInfo.profile?.numFollowers}</Follower> Followers</Following>
              <UL>
                <LI style={{color: "blue",borderBottom: "blue solid 1px"}}>Tweets</LI>
                <LI style={{color: "black"}}>Media</LI>
                <LI style={{color: "black"}}>Likes</LI>
              </UL>  
            </Main>
      </div> 
        : <Loading><CircularProgress /></Loading> }  

    {(status === "idle") ? 
       Object.values(tweets.tweetsById).sort(sortByDate).map((tweet , index) => {
        const date = moment(tweet.author?.joined).format("MMM YY")
          return(
              (tweet.author?.handle === tweetHandle) ?
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
                
              <Names>{tweet.author?.displayName}</Names> 
                <span> @ {tweet.author?.handle}</span>
                <span> - {date}</span>  
              
                <Div2>{tweet?.status}</Div2>
                
                {(tweet?.media[0] === undefined) ? "" : <Img src={tweet.media[0].url}></Img>}
                
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
            </Mainn> 
          </TweetInfo>
        </div> :  ""
                        
          )}) : <Loading><CircularProgress /></Loading>}
          </Div>
          </>
    )
}

export default ProfileDetails;

const Div = styled.div`
float: right;
width: 67%;
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
width: 11%;
border-radius: 50%;
margin-right: 10px;
position: absolute;
top: 40%;
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
/* margin-left: 10px; */
`

const Follow = styled.span`
margin-right: 1px;
font-weight: bolder;
`

const Follower = styled.span`
margin-left: 15px;
font-weight: bolder;
`

const JoinedIcon = styled.span`
margin-left: 8px;
margin-right: 5px;
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

const Div2 = styled.h3`
padding: 0%;
margin: 0%;
flex: end;
margin: 40px 0px 10px 0px;
`

const Names = styled.span`
font-weight: bolder;
font-size: 23px;
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
padding: 2% 3%;
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