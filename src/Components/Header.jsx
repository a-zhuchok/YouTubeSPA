import React from 'react';
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <div class='header'>
            <div class='header_menu'>
                <img src={logo} alt='logo' width={50} height={50} />
                <p><a class='menu_link' href='/search'>Поиск</a></p>
                <p><a class='menu_link' href='/favorites'>Избранное</a></p>
            </div>
            <div class='header_exit'>
                <p><a class='menu_link' href='/login'>Выйти</a></p>
            </div>
        </div>
    )
}

export default Header