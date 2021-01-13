import React, {useContext, useState} from 'react'
import {Link} from "react-router-dom";
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from "../../context/AuthContext";


import './LinksList.scss'

export const LinksList = ({links}) =>{
    const {loading, request} = useHttp()
    const [link, setLink] = useState('')
    const {token} = useContext(AuthContext)

    if(!links.length){
        return <h3 className="no-links-body">Ссылок пока нет</h3>
    }
    const deleteHandler = async (event, linkID) => {
        // event.preventDefault()
        // setLink(link._id)
        try {
            // console.log('linkid ', link, linkID)
            const data = await request('/api/link/delete', 'DELETE', {delId: linkID}, {
                Authorization: `Bearer ${token}`
            })
        } catch (e) {}
    }

    return (
        <div className="links-list-wrap">
            <table className="links-list-body">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Оригинальная</th>
                    <th>Сокращенная</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                { links.map((link, index) => {

                    return(
                        <tr key={link._id}>
                            <td>{index + 1}.</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>Подробнее</Link>
                            </td>
                            {/*<td>*/}
                            {/*    <a*/}
                            {/*        href=''*/}
                            {/*        onClick={(e)=>{*/}
                            {/*            deleteHandler(e, link._id);*/}
                            {/*        }}*/}
                            {/*    >Удалить</a>*/}
                            {/*</td>*/}
                        </tr>
                    )
                }) }
                </tbody>
            </table>
        </div>
    )
}