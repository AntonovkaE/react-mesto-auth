import React from "react";
import {useNavigate} from 'react-router-dom'
import PopupWithForm from "./PopupWithForm";
import * as auth from '../utils/auth'
import {useState} from "react";
import Input from "./Input";
import Form from "./Form";

function Register({onSubmit}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.register(password, email)
            .then(res => {
                onSubmit(res.status)
                if (res.status !== 400) {
                    navigate('/sign-in');
                } else {
                    console.log(`код ошибки ${res.status}`)
                }
            })
    }
    return (<Form
        name='auth'
        title='Регистрация'
        submitButtonText="Зарегистрироваться"
        onSubmit={handleSubmit}
    >
        <Input value={email} name="email" onChange={handleEmailChange} type="email" placeholder="Email" maxLength="30" minLength="2"/>
        <Input value={password} name="password" onChange={handlePasswordChange} type="password" placeholder="Пароль" maxLength="30" minLength="2"/>

    </Form>)
}

export default Register;