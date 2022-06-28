import PopupWithForm from "./PopupWithForm";
import React, {useState} from 'react';
import * as auth from '../utils/auth.js';
import {useNavigate} from "react-router-dom";
import Input from "./Input";

function Login({onSubmit}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return
        }
        auth.authorize(password, email)
            .then(data => {
                if (data.token) {
                    onSubmit(email);
                    setEmail('');
                    setPassword('');
                    navigate('/')
                }
            })
            .catch(err => console.log(err))
    }

    const onClose = () => {
    }
    return (<PopupWithForm
        name='auth'
        title='Вход'
        isOpen={true}
        onClose={onClose}
        submitButtonText="Войти"
        onSubmit={handleSubmit}
    >
        <Input value={email} name="email" onChange={handleEmailChange} type="email" placeholder="Email" maxLength="30" minLength="2"/>
        <Input value={password} name="password" onChange={handlePasswordChange} type="password" placeholder="Пароль" maxLength="30" minLength="2"/>
    </PopupWithForm>)
}

export default Login;