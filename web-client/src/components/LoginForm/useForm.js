import { useState } from 'react';
import { useHistory } from "react-router-dom";

let url = 'http://localhost:8000'

const useForm = () => {
    const [values, setValues] = useState({
        userEmail: '',
        userPassword: '',
        userConfPassword: '',
        userAlias: ''
    });

    const history = useHistory();

    const [showLogin, setShowLogin] = useState(false)
    const [showSignup, setShowSignup] = useState(false)

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if(showLogin){
            await login()
        }
        else if(showSignup){
            await signup()
        }
        else {
            await isRegistered()
        }
    };

    
    async function isRegistered(e) {
        if (values.userEmail.length > 0){
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({ email: values.userEmail})
            };
            await fetch(url + '/api/users/available/', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data['detail'])
                if(data['detail'] === 'Username available'){
                    setShowSignup(true)
                } 
                else{
                    setShowLogin(true)
                }
            });
        }
    }

    async function login(){


        if (values.userPassword.length > 0){
            fetch(url + '/api/token', {
                credentials: 'include',
                method: 'POST',
                body: new URLSearchParams({
                    'username': values.userEmail,
                    'password': values.userPassword
                }) 
            })
            .then(response => response.json())
            .then(data => {
                if(data['access_token']){
                    console.log("Logged in")
                    //return <Redirect to="/home" />
                    history.push("/home");
                }
                else {
                    console.log(data['detail'])
                }
            });
        }
    }

    async function signup(){
        if (values.userPassword.length > 0 && (values.userPassword.trim() === values.userConfPassword.trim())){
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: values.userEmail,
                    username: values.userAlias,
                    hashed_password: values.userPassword
                })
            };
            await fetch(url + '/api/users', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            });
        }
    }

    return { handleChange, handleSubmit, values, showSignup, showLogin }
};

export default useForm;