import React,{useState, useCallback, useEffect, useContext} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader/Loader";
import {LinksList} from "../components/LinksList/LinksList";

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)


    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request(
                '/api/link',
                'GET',
                null,
                {Authorization: `Bearer ${token}`}
            )
            setLinks(fetched)
        } catch (e) {
        }
    }, [token, request])



    useEffect(()=>{
        fetchLinks()
    }, [fetchLinks])

    if(loading){
       return <Loader />
    }

    return(
        <div className="container">
            {!loading && <LinksList links={links} />}

        </div>
    )
}