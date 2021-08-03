import { useState } from 'react';

let url = 'http://localhost:8000'

const useForm = () => {
    const [values, setValues] = useState({
        userEmail: '',
        userPassword: '',
        userConfPassword: '',
        userAlias: ''
    });

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

    async function login(e){
        console.log(e)
    }

    async function signup(e){
        console.log(e.data);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'React' })
        };
        await fetch(url + '/api/users/available/', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data['detail'])
            if(data['detail'] === 'Username available'){
                setShowSignup(true)
            } else{
                setShowLogin(true)
            }
        });
    }

    return { handleChange, handleSubmit, values, showSignup, showLogin }
};

export default useForm;