import React from 'react'

import './Loader.scss'

export const Loader = () =>{

    return(
        <div className="container">
           <div className="loader-body">
               <h3 className="loader-title">Идёт загрузка, пожалуйста подождите...</h3>
           </div>
        </div>
    )
}