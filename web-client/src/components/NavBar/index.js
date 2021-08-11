import React, { useEffect } from "react";
import logo from './../../logo.png';
import './style.css'
import { Nav, Container, Navbar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";

let url = 'http://localhost:8000'

export default function NavBar(){

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
            <Navbar id="navbar" collapseOnSelect expand="lg">
                <Container>
                <Navbar.Brand href="/"><img id="logo" src={logo}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                    <Nav.Link class="navLinks" href="/join">JOIN GAME</Nav.Link>
                    <Nav.Link class="navLinks" href="/create">CREATE GAME</Nav.Link>
                    <Nav.Link class="navLinks" onClick={logout}>LOG OUT</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
                </Navbar>
        </div>)
}; 