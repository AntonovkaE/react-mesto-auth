import React, {useState} from 'react';
import logo from "../img/logo.svg";
import {Link, useLocation} from "react-router-dom";
import {useEffect} from "react";


function Header() {
    const [headerLink, setHeaderLink] = useState('');
    const [headerTitle, setHeaderTitle] = useState('');
    let location = useLocation();
    // console.log(location.pathname)


    useEffect(() => {
        if (location.pathname === '/sign-in') {
            setHeaderTitle('Регистрация')
            setHeaderLink("/sign-up")
        }
        if (location.pathname === '/sign-up') {
            setHeaderTitle('Войти')
            setHeaderLink("/sign-in");
        }
    }, [])

    return (
        <header className="header">
            <img src={logo} alt="место" className="header__logo"/>
            <Link className='link' to='/sign-in'>
                <p className="header__auth">{headerTitle}</p>
            </Link>
        </header>
    );
}

export default Header;

