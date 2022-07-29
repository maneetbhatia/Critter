import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {ReactComponent as LogoIcon} from '../assets/logo.svg';
import { BiHomeAlt, BiBell } from "react-icons/bi";
import { GiCharacter } from "react-icons/gi";
import { BsBookmark } from "react-icons/bs";
import { COLORS } from "../constants";
import './Sidebar.css'

const Header = () => {
    return (
      <>
      <Main>
        <ul>
        <Logo><LogoIcon /></Logo>
        <List><NavLinks to='/' activeclassname="active" ><Span><BiHomeAlt /></Span>Home</NavLinks></List>
        <List><NavLinks to='/profile'><Span><GiCharacter /></Span>Profile</NavLinks></List>
        <List><NavLinks to='/notifications'><Span><BiBell /></Span>Notifications</NavLinks></List>
        <List><NavLinks to='/bookmarks'><Span><BsBookmark /></Span>Bookmarks</NavLinks></List>
        </ul>
    </Main>
    </>
    )
  };

export default Header;

const Main = styled.div`
  position: fixed;
  width: 20%;
  height: 100%;
  float: left;
  padding-left: 30px;
`

const Logo = styled.div`
font-size: 40px;
margin-bottom: 10%;
color: ${COLORS.primary};
`

const List = styled.li`
font-size: 25px;
margin-bottom: 10%;
text-decoration: none;
list-style: none;
color: black;
padding: 10px;
font-family: 'Times New Roman', Times, serif;
width: fit-content;
&:hover{
  background-color: #e6e6ff;
  border-radius: 40px;
  margin-left: 10px;
};
`
const NavLinks = styled(NavLink)`
  padding: 10px;
  color: black;
  text-decoration: none;
  &:hover{
    color: ${COLORS.primary};
  }
`;

const Span = styled.span`
margin-right: 10px;
`
