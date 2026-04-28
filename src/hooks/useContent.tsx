import axios from "axios"
import { useState } from "react"


export function useContent() {
 const [content, setContent] = useState([])
 const BASE_URL = import.meta.env.VITE_BACKEND_URL_PROD;

function fetchContent() {
 axios.get(`${BASE_URL}/api/v1/content`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then((res) => {
        setContent(res.data.Content)
    })
}

function removeContent(contentId: string) {
    setContent((prevContent) => 
        prevContent.filter((item: any) => item._id !== contentId)
    )
}

    return {content, fetchContent, removeContent}
}


