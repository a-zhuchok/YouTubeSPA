import React from 'react';
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <div class='header'>
            <div class='header_menu'>
                <img src={logo} alt='logo' width={50} height={50} />
                <p><Link class='menu_link' to='/search'>Поиск</Link></p>
                <p><Link class='menu_link' to='/favorites'>Избранное</Link></p>
            </div>
            <div class='header_exit'>
                <p><Link class='menu_link' to='/login'>Выйти</Link></p>
            </div>
        </div>
    )
}

export default Header