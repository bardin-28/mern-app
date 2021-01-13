import React,{useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../../context/AuthContext";

import './Navbar.scss'

export const Navbar = () =>{
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event =>{
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return(
        <div className="nav-wrapper">
            <div className="container">
                <nav className="nav-body">
                    <ul>
                        <li>
                            <NavLink to="/create">Создать</NavLink>
                        </li>
                        <li>
                            <NavLink to="/links">Ссылки</NavLink>
                        </li>
                        <li>
                            <a
                                href="/"
                                onClick={logoutHandler}
                            >Выйти</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}