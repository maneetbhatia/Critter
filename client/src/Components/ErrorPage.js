import styled from "styled-components";
import { GiUnlitBomb } from "react-icons/gi";

const ErrorPage = () => {
    return (
    <Div>
        <Icon><GiUnlitBomb /></Icon>
        <H1>An unknown error has occured.</H1>
        <H3>Please try <Span>refreshing</Span> the page or contact support if problem persists.</H3>
    </Div>
    )
}

export default ErrorPage;

const Div = styled.div`
float: right;
width: 67%;
margin: auto;
`

const Icon = styled.p`
text-align: center;
font-size: 70px;
padding: 30px;
`

const H1 = styled.p`
text-align: center;
padding: 20px;
font-size: 25px;
`

const H3 = styled.h3`
text-align: center;
font-size: 30px;
`

const Span = styled.span`
color: blue;
`