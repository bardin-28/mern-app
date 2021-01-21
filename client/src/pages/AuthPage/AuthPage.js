import React, {useState, useContext} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";

import './AuthPage.scss'

export const AuthPage = () =>{

    const auth = useContext(AuthContext)

    const {loading, error, request} = useHttp()
    const [created, setCreated] = useState('')
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const changeHandler = event =>{
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler  = async () =>{
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            setCreated(data.message)

        }catch (e){}
    }

    const loginHandler  = async () =>{
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        }catch (e){
            console.error(e)
        }
    }

    return(
        <div className="auth-wrapper">
            <div className="container">
               <div className="auth-body">
                   <h1 className="auth-title">Сократи ссылку</h1>
                   <div className="auth-form-wrap">
                       <h2 className="auth-form-title">Авторизация</h2>
                       <div className="auth-form">
                           <div className="auth-input-wrap">
                               <input
                                   style={error ?
                                       {border: "2px solid #F24E1E"} :
                                       {border: "2px solid #adadad"}}
                                   placeholder="Введите Email"
                                   type="email"
                                   id="auth-email"
                                   name="email"
                                   onChange={changeHandler}
                                   value={form.email}
                               />
                           </div>
                           <div className="auth-input-wrap">
                               <input
                                   style={error ?
                                       {border: "2px solid #F24E1E"} :
                                       {border: "2px solid #adadad"}}
                                   placeholder="Введите пароль"
                                   type="password"
                                   id="auth-password"
                                   name="password"
                                   onChange={changeHandler}
                                   value={form.password}
                               />
                           </div>
                       </div>
                       <div className="auth-actions">
                           <button
                               className="auth-button"
                               disabled={loading}
                               onClick={loginHandler}

                           >Войти</button>
                           <button
                               className="auth-button"
                               disabled={loading}
                               onClick={registerHandler}
                           >Регистрация</button>
                       </div>
                       <p className="auth-errors">{created}</p>
                       <p className="auth-errors">{error}</p>
                   </div>
               </div>
            </div>
        </div>
    )
}