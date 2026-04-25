import { useEffect, useRef } from 'react'
import ShareIcon from '../assets/icons/ShareIcon'
import YouTubeIcon from '../assets/icons/YouTubeIcon'
import XIcon from '../assets/icons/XIcon'
import DeleteIcon from '../assets/icons/DeleteIcon'
import axios from 'axios'

interface cardProps {
    title: string,
    link: string,
    cardtype: "youtube" | "twitter",
    id: string
}


const Card = ({ title, link, cardtype, id }: cardProps) => {

    const handledelete = async () => {
        try {
            await axios.delete('/api/v1/content', {
                data: { contentId: id },
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            alert("Content deleted successfully")
            // window.location.reload()
        } catch (error) {
            alert("Failed to delete content: " + error)
        }
    }


    const twitterRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (cardtype === "twitter" && twitterRef.current) {
            // Load Twitter widget script
            if (!window.twttr) {
                const script = document.createElement('script')
                script.src = 'https://platform.twitter.com/widgets.js'
                script.async = true
                script.charset = 'utf-8'
                document.body.appendChild(script)

                script.onload = () => {
                    if (window.twttr?.widgets) {
                        window.twttr.widgets.load(twitterRef.current)
                    }
                }
            } else {
                // Script already loaded, just render the widget
                window.twttr?.widgets?.load(twitterRef.current)
            }
        }
    }, [cardtype, link])

    return <div>
        <div className='p-4 m-3 bg-white rounded-md border-gray-200 border w-80'>
            <div className='flex justify-between'>
                <div className='flex'>
                    <div className='text-gray-500 pr-2'>
                        {cardtype === "youtube" ? <YouTubeIcon /> : <XIcon />}
                    </div>
                    {title}
                </div>
                <div className='flex justify-center items-center gap-1'>
                    <button 
                        onClick={handledelete}
                        className='text-gray-500 hover:text-red-500 cursor-pointer'
                        aria-label="Delete content"
                    >
                        <DeleteIcon />
                    </button>
                    <div className='text-gray-500'>
                        <ShareIcon />
                    </div>
                </div>
            </div>
            <div className='pt-4'>
                {cardtype === "youtube" && (() => {
                    // Convert YouTube URL to embed format
                    // Handles: youtube.com/watch?v=VIDEO_ID or youtu.be/VIDEO_ID
                    let embedUrl = link
                    if (link.includes('youtube.com/watch')) {
                        const videoId = link.match(/[?&]v=([^&]+)/)?.[1]
                        if (videoId) {
                            embedUrl = `https://www.youtube.com/embed/${videoId}`
                        }
                    } else if (link.includes('youtu.be/')) {
                        const videoId = link.split('youtu.be/')[1]?.split('?')[0]
                        if (videoId) {
                            embedUrl = `https://www.youtube.com/embed/${videoId}`
                        }
                    }
                    return (
                        <iframe
                            className='w-full'
                            src={embedUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    )
                })()}
                {cardtype === "twitter" && (
                    <div ref={twitterRef}>
                        <blockquote className="twitter-tweet">
                            <a href={link.replace("x.com", "twitter.com")}>{link}</a>
                        </blockquote>
                    </div>
                )}
            </div>
        </div>
    </div>
}

export default Card