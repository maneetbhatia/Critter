import { useContext,useState, useEffect } from "react";
import styled from "styled-components";
import { TweetContext } from "./TweetContext";
import {useNavigate} from 'react-router-dom';
import { CircularProgress } from "@material-ui/core";

const NewTweet = () => {
    const [totalLength, setTotalLength] = useState(280);
    const [isDisabled, setIsDisabled] = useState(false);
    const [limitColor, setLimitColor] = useState("black");
    const [tweetStatus, setTweetStatus] = useState("");

    const {tweets,getTweetData, status} = useContext(TweetContext);

    useEffect(() => {
    getTweetData();
    }, [])

    const checkLength = (e) => {
      const input = e.target.value;
      const inputLength = input.length;
      setTotalLength(280-inputLength);
      setTweetStatus(e.target.value)
    }
    
    useEffect(() => {
        if(totalLength < 56 && totalLength > -1){
          setLimitColor("yellow");
          setIsDisabled(false);
        }
        else if(totalLength <= -1){
          setLimitColor("red");
          setIsDisabled(true);
        }
        else{
          setLimitColor("black");
          setIsDisabled(false)
        }
    }, [totalLength])

    const history = useNavigate();
    const handleSubmit = () => {
        fetch("/api/tweet", {
            method: "POST",
            headers: {"Accept": "application/json","Content-Type": "application/json"},
            body: JSON.stringify({status: tweetStatus}),
        }).then(res =>  res.json())
        .catch(e => {
          console.log("error", e);
          history("/errorpage")
        })
      getTweetData();
      setTweetStatus("")
    }

    return (
        <>
        {(status === "idle") ? 
        <>
        <Heading>Home</Heading>
        <Input>
        <span><Avatar src={tweets.tweetsById["1212689921057665024"].author.avatarSrc}></Avatar></span>
        <Textarea onChange={checkLength} placeholder="What's Happening?" value={tweetStatus}></Textarea>
        <div>
        <Span color={limitColor}>{totalLength}</Span>
        <Button onClick={handleSubmit} disabled={isDisabled}>Meow</Button>
        </div>
        </Input> 
        </>
        : <Loading><CircularProgress /></Loading>} 
        </>
    )
}

export default NewTweet;

const Input = styled.div`
  position: relative;
`

const Heading =styled.h1`
  border-bottom: 1px solid silver;
  border-left: 1px solid silver;
  border-right: 1px solid silver;
  padding: 5px;
  padding-left: 10px;
`

const Avatar = styled.img`
width: 6%;
border-radius: 50%;
margin-right: 10px;
position: absolute;
top: 7%;
left: 2%;
display: flex;
float: left;
`

const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 25px 80px;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
`

const Span = styled.span`
  color: ${(props) => props.color};
  position: absolute;
  top: 80%;
  left: 80%;
`

const Button = styled.button`
  position: absolute;
  top: 75%;
  left: 86%;
  padding: 10px 30px;
  color: white;
  background-color: ${props => (props.disabled) ? "silver" : "hsl(258deg, 100%, 50%)"};
  border: none;
  border-radius: 15px;
  cursor: pointer;
`

const Loading =styled.div`
padding-top: 20px;
font-size: 40px;
width: 30%;
margin: auto;
`