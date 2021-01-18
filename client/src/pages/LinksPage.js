import React,{useState, useCallback, useEffect, useContext} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader/Loader";
import {LinksList} from "../components/LinksList/LinksList";

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const [link, setLink] = useState('')
    const {token} = useContext(AuthContext)

    const deleteHandler = async (event, linkID, deletedIndex) => {
        setLink(link._id)
        try {
            const data = await request('/api/link/delete', 'DELETE', {delId: linkID}, {
                Authorization: `Bearer ${token}`
            })
        } catch (e) {}
    }

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
    }, [token, request, link])


    useEffect(()=>{
        fetchLinks()
    }, [fetchLinks])


    if(loading){
       return <Loader />
    }

    return(
        <div className="container">
            {!loading && <LinksList links={links} deleteHandler={deleteHandler} />}

        </div>
    )
}