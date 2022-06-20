import React from "react";
import {useNavigate} from 'react-router-dom'
import PopupWithForm from "./PopupWithForm";
import * as auth from '../auth'
import {useState} from "react";

function Register() {
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
                if (res) {
                    navigate('/sign-in');
                } else {
                    console.log('Что-то пошло не так')
                }
            })
    }
    handleEmailChange.bind(this);
    handlePasswordChange.bind(this);
    handleSubmit.bind(this);
    return (<PopupWithForm
        name='auth'
        title='Регистрация'
        isOpen={true}
        onClose={false}
        submitButtonText="Зарегистрироваться"
        onSubmit={handleSubmit}
    >
        <label htmlFor="place-input" className="form__label">
            <input onChange={handleEmailChange} type="email" name="emailInput"
                   id="emailInput"
                   className="form__item form__item_dark-form form__item_el_email"
                   placeholder="Email" maxLength={30} minLength={2} required/>
            <span className="form__item-error place-input-error"/>
        </label>
        <label htmlFor="url-input" className="form__label">
            <input onChange={handlePasswordChange} type="password" id="passwordInput"
                   name="passwordInput"
                   className="form__item form__item_dark-form form__item_el_password"
                   placeholder="Пароль" minLength={8} required/>
            <span className="form__item-error url-input-error"/>
        </label>
    </PopupWithForm>)
}

export default Register;