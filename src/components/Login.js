import PopupWithForm from "./PopupWithForm";
import React, {useState, useEffect} from 'react';
import * as auth from '../auth.js';
import {useNavigate} from "react-router-dom";

function Login({onSubmit}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let userEmail
    let loggedIn = false;
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
                console.log(data)
                if (data.token) {
                    setEmail('');
                    setPassword('');
                    onSubmit({
                        email,
                        password
                    });
                    onSubmit();
                    navigate('/cards')
                }
            })
            .catch(err => console.log(err))
    }

    const handleTokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.getContent(jwt)
                .then(res => {
                    if (res) {
                        // setUserData(res.data.email)
                        userEmail = res.data.email;
                        loggedIn = true;
                        // navigate('/cards')
                    }

                })
        }
    }
    useEffect(() => {
        handleTokenCheck()
    }, [])


    const onClose = () => {}
    return (<PopupWithForm
        name='auth'
        title='Вход'
        isOpen={true}
        onClose={onClose}
        submitButtonText="Войти"
        onSubmit={handleSubmit}
    >
        <label htmlFor="place-input" className="form__label">
            <input value={email || ''} onChange={handleEmailChange} type="email" name="emailInput" id="emailInput"
                   className="form__item form__item_dark-form form__item_el_email"
                   placeholder="Email" maxLength={30} minLength={2} required/>
            <span className="form__item-error place-input-error"/>
        </label>
        <label htmlFor="url-input" className="form__label">
            <input value={password || ''} onChange={handlePasswordChange} type="password" id="passwordInput" name="passwordInput"
                   className="form__item form__item_dark-form form__item_el_password"
                   placeholder="Пароль" minLength={8} required
                   autoComplete="on"/>
            <span className="form__item-error url-input-error"/>
        </label>
    </PopupWithForm>)
}
export default Login;