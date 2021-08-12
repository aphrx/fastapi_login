import styled from 'styled-components';
import { Nav, Navbar } from "react-bootstrap";

export const NavLink = styled(Nav.Link)`
    color: white;
    padding: 20px;
    text-decoration: none;
    font-size: 20px;
    font-weight: 600;
`;

export const NavBar = styled(Navbar)`
    padding: 0px;
    background-color: #F9A825;
`

export const NavBarBrand = styled(Navbar.Brand)`
    padding: 0px;
    background-color: #F9A825;
`

export const NavBarToggle = styled(Navbar.Toggle)`
    padding: 0px;
    color: white;
    background-color: #F9A825;
`

export const NavBarCollapse = styled(Navbar.Collapse)`
    padding: 0px;
    background-color: #F9A825;
`

export const NavBarImage = styled.img`
    height:80px
`