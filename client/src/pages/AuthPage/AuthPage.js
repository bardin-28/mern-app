import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";

import './AuthPage.scss'

export const AuthPage = () =>{

    const auth = useContext(AuthContext)

    const {loading, error, request} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(()=>{
        console.log(error, 'error')
        // clearError()
    },[error])

    const changeHandler = event =>{
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler  = async () =>{
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log('data', data)
        }catch (e){}
    }

    const loginHandler  = async () =>{
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            console.info('auth: ', auth)
            auth.login(data.token, data.userId)
        }catch (e){
            console.error(e, 'error in login')
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
                                   style={{border: "1px solid #adadad"}}
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
                                   style={{border: "1px solid #adadad"}}
                                   placeholder="Введите пароль"
                                   type="text"
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
                   </div>
               </div>
            </div>
        </div>
    )
}