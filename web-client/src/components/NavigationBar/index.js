import React, { useEffect } from "react";
import logo from './../../logo.png';
import { NavLink, NavBar, NavBarBrand, NavBarToggle, NavBarCollapse, NavBarImage } from "./style.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";

let url = 'http://localhost:8000'

export default function NavigationBar(){

    useEffect(() => {validateUser()}, [])
    
    const history = useHistory();
    

    async function validateUser() {
        const requestOptions = {
            credentials: 'include',
            method: 'GET',
            headers: {'Content-Type': 'application/json' }
        };
        await fetch(url + '/api/users/me', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data['detail'] == 'Not authenticated') {
                history.push("/");
            }
            
        });
    }

    async function logout(){
        console.log("logging out");
        const requestOptions = {
            credentials: 'include',
            method: 'GET',
            headers: {'Content-Type': 'application/json' }
        };
        await fetch(url + '/api/users/logout', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            validateUser()
        });
    }


    return (<div>
            <NavBar collapseOnSelect expand="lg">
                <Container>
                <NavBarBrand href="/"><NavBarImage id="logo" src={logo}/></NavBarBrand>
                <NavBarToggle aria-controls="responsive-navbar-nav" />
                <NavBarCollapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <NavLink class="navLinks" onClick={logout}>LOG OUT</NavLink>
                    </Nav>
                </NavBarCollapse>
                </Container>
                </NavBar>
        </div>)
}; 