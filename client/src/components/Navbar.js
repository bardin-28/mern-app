import React,{useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";


export const Navbar = () =>{
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event =>{
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return(
        <div className="container">
            <nav className="nav-wrapper">
                <ul style={{
                    maxWidth: 450,
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '50px 0',
                    marginTop: 20
                }}>
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
    )
}