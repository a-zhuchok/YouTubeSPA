import React from 'react';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    

    return (
        <div class='header'>
            <div class='header_menu'>
                <img src={logo} alt='logo' width={50} height={50} />
                <p><a href='/search'>Поиск</a></p>
                <p><a href='/favorites'>Избранное</a></p>
            </div>
            <div class='header_exit'>
            <p><a href='/login'>Выйти</a></p>
            </div>
        </div>
    )
}

export default Header