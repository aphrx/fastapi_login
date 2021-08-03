import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import logo from './logo.png';
import useForm from './useForm';



export default function LoginPage() {

    const { handleChange, handleSubmit, values, showSignup, showLogin } = useForm();

    return (
        <div>
            <img className="logo" src={logo}/>
            <div className="container">
                
                <div className="box justify-content-center align-items-center">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Control
                                    className="form-padding"
                                    type="text"
                                    name="userEmail"
                                    placeholder="Email"
                                    value={values.userEmail}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {
                                showLogin || showSignup?<Form.Group>
                                    <Form.Control
                                        className="form-padding"
                                        type="password"
                                        value={values.userPassword}
                                        onChange={handleChange}
                                        name="userPassword"
                                        placeholder="Password"
                                    />
                                </Form.Group>:null
                            }
                            {
                                showSignup?<div>
                                <Form.Group>
                                    <Form.Control
                                        className="form-padding"
                                        type="password"
                                        value={values.userConfPassword}
                                        onChange={handleChange}
                                        name="userConfPassword"
                                        placeholder="Confirm Password"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        className="form-padding"
                                        type="text"
                                        value={values.userAlias}
                                        onChange={handleChange}
                                        name="userAlias"
                                        placeholder="Alias"
                                    />
                                </Form.Group>
                                </div>:null
                            }
                            
                            <Button
                                variant="outline-primary"
                                className="continueButton"
                                size={"block"}
                                data-testid="validateButton"
                                id="validateButton"
                                type="submit"
                            >
                                Continue
                            </Button>
                        </Form>
                    </div>
            </div>
        </div>
    );
}