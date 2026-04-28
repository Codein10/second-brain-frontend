import { useEffect, useRef, useState } from 'react'
import ShareIcon from '../assets/icons/ShareIcon'
import YouTubeIcon from '../assets/icons/YouTubeIcon'
import XIcon from '../assets/icons/XIcon'
import DeleteIcon from '../assets/icons/DeleteIcon'
import axios from 'axios'
import Raddit from '../assets/icons/RedditIcon'

interface cardProps {
    title: string,
    link: string,
    cardtype: "youtube" | "twitter" | "reddit",
    _id: string
    onDelete?: (id: string) => void
}

// Extend window to include twttr
declare global {
    interface Window {
        twttr?: any
    }
}


const Card = ({ title, link, cardtype, _id, onDelete }: cardProps) => {
    const twitterRef = useRef<HTMLDivElement>(null)
    const [twitterLoading, setTwitterLoading] = useState(true)

    const handleDelete = async () => {
        try {
            await axios({
                method: 'delete',
                url: '/api/v1/content',
                data: { contentId: _id },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            })
            alert("Content deleted successfully")
            // Call the callback to remove from UI
            onDelete?.(_id)
        } catch (error: any) {
            alert("Failed to delete content: " + (error.response?.data?.message || error.message))
        }
    }

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: title,
                    url: link
                })
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(link)
                alert("Link copied to clipboard!")
            }
        } catch (error: any) {
            alert("Error sharing content: " + (error.response?.data?.message || error.message))
        }
    }

    useEffect(() => {
        if (cardtype === "twitter" && twitterRef.current) {
            // Load Twitter widgets script
            const loadTwitterScript = () => {
                if (!window.twttr) {
                    const script = document.createElement('script')
                    script.src = 'https://platform.twitter.com/widgets.js'
                    script.async = true
                    script.charset = 'utf-8'
                    document.body.appendChild(script)

                    script.onload = () => {
                        if (window.twttr?.widgets) {
                            window.twttr.widgets.load(twitterRef.current).then(() => {
                                setTwitterLoading(false)
                            })
                        }
                    }
                } else {
                    window.twttr?.widgets?.load(twitterRef.current).then(() => {
                        setTwitterLoading(false)
                    })
                }
            }

            loadTwitterScript()
        }
    }, [cardtype, link])

    const getEmbedUrl = () => {
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
        return embedUrl
    }

    // Load Reddit embed script
    useEffect(() => {
        if (cardtype === "reddit") {
            const script = document.createElement("script")
            script.src = "https://embed.reddit.com/widgets.js"
            script.async = true
            document.body.appendChild(script)

            return () => {
                if (document.body.contains(script)) {
                    document.body.removeChild(script)
                }
            }
        }
    }, [cardtype])

    return (
        <div className="h-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 text-gray-600">
                        {cardtype === "youtube" ? <YouTubeIcon />
                            : cardtype === "twitter" ? <XIcon />
                                : cardtype === "reddit" ? <Raddit />
                                    : null}
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-2 break-words">
                        {title}
                    </h3>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <button
                        onClick={handleShare}
                        className="p-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        aria-label="Share content"
                        title="Share"
                    >
                        <ShareIcon />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        aria-label="Delete content"
                        title="Delete"
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden bg-gray-50">
                {cardtype === "youtube" && (
                    <div className="w-full h-48 md:h-56">
                        <iframe
                            className="w-full h-full"
                            src={getEmbedUrl()}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                )}

                {cardtype === "twitter" && (
                    <div
                        ref={twitterRef}
                        className="w-full h-48 md:h-56 overflow-y-auto"
                    >
                        {twitterLoading && (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 animate-pulse">
                                <div className="text-center">
                                    <div className="inline-block w-10 h-10 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin mb-2"></div>
                                    <p className="text-sm text-gray-600">Loading tweet...</p>
                                </div>
                            </div>
                        )}
                        <blockquote className="twitter-tweet" style={{ display: twitterLoading ? 'none' : 'block' }}>
                            <a href={link.replace("x.com", "twitter.com")}>
                                Loading tweet...
                            </a>
                        </blockquote>
                    </div>
                )}

                {cardtype === "reddit" && (
                    <div className="w-full h-48 md:h-56 overflow-y-auto">
                        <blockquote className="reddit-embed" data-embed-height="316">
                            <a href={link}>{title}</a>
                        </blockquote>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Card