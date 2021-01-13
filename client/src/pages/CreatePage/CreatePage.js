import React, {useContext, useState} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import {useHistory} from 'react-router-dom'

import './CreatePage.scss'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    };

    const pressHandler = async event => {
        if (event.key === 'Enter') {

            isValidURL(link)
            console.log('dadas ', isValidURL(link))

            try {

                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    return (
        <div className="create-wrapper">
            <div className="container">
                <div className="create-body">
                    <h2 className="create-title">Создание сокращенной ссылки:</h2>
                    <div className="input-field">
                        <input
                            placeholder="Вставьте ссылку"
                            id="link"
                            type="text"
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            onKeyPress={pressHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
