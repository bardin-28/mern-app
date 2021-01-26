import React from 'react'

import './LinkCard.scss'

export const LinkCard = ({ link }) => {


    return (
        <div className="link-card-wrap">
           <div className="container">
              <div className="link-card-body">
                  <h2 className="link-title">Ссылка</h2>
                  <form>
                      <div className="link-info">Скороченная ссылка: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a>
                      </div>
                      <div className="link-info">Ваша ссылка: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a>
                      </div>
                      <p>Количество кликов по ссылке: <strong>{link.clicks}</strong></p>
                      <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
                  </form>
              </div>
           </div>
        </div>
    )
}