import axios from "axios"
import { useEffect, useState } from "react"


export function useContent() {
 const [content, setContent] = useState([])
 
function fetchContent() {
 axios.get('/api/v1/content', {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then((res) => {
        setContent(res.data.Content)
    })

}
    return {content,fetchContent}
}


