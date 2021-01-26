import React from 'react'
import {Link} from "react-router-dom";

import './LinksList.scss'

export const LinksList = ({links, deleteHandler}) =>{

    if(!links.length){
        return <h3 className="no-links-body">Ссылок пока нет</h3>
    }

    return (
        <div className="links-list-wrap">
            <table className="links-list-body">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Оригинальная</th>
                    <th>Сокращенная</th>
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
                            <td>
                                <a
                                    href=''
                                    onClick={(e)=>{
                                        e.preventDefault()
                                        deleteHandler(e, link._id, index);
                                    }}
                                >Удалить</a>
                            </td>
                        </tr>
                    )
                }) }
                </tbody>
            </table>
        </div>
    )
}