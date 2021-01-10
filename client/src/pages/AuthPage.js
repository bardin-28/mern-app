import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

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
        <div style={{
            marginTop: "150px",
            marginLeft: "700px"
        }}>
            <div className="container">
                <h1>Сократи ссылку</h1>
                <div className="auth-form-wrap">
                    <h2>Авторизация</h2>
                    <div className="auth-form">
                        <div className="input-wrap">
                            <input
                                style={{border: "1px solid #adadad"}}
                                placeholder="Введите Email"
                                type="email"
                                id="auth-email"
                                name="email"
                                onChange={changeHandler}
                                value={form.email}
                            />
                            <label htmlFor="auth-email">Email</label>
                        </div>
                        <div className="input-wrap">
                            <input
                                style={{border: "1px solid #adadad"}}
                                placeholder="Введите пароль"
                                type="text"
                                id="auth-password"
                                name="password"
                                onChange={changeHandler}
                                value={form.password}
                            />
                            <label htmlFor="auth-email">Пароль</label>
                        </div>
                    </div>
                    <div className="auth-actions">
                        <button
                            style={{
                                border: "1px solid #adadad",
                                marginTop: "15px",
                                width: "250px",
                                height: "30px"
                            }}
                            disabled={loading}
                            onClick={loginHandler}

                        >Войти</button>
                        <button
                            style={{
                                border: "1px solid #adadad",
                                marginTop: "15px",
                                width: "250px",
                                height: "30px"
                            }}
                            disabled={loading}
                            onClick={registerHandler}
                        >Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}