
import CrossIcon from "../assets/icons/CrossIcon"
import XIcon from "../assets/icons/XIcon"
import YouTubeIcon from "../assets/icons/YouTubeIcon"
import SideBarItems from "./SideBarItems"
import brainly from "../assets/icons/Brainly.jpg"
import Reddit from "../assets/icons/RedditIcon"
import { useRef, useEffect } from "react"

type SideBarProps = {
    isSideBarOpen: boolean
    setIsSideBarOpen: any
    selectedFilter: string
    onFilterChange: (filter: string) => void
}

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, selectedFilter, onFilterChange }: SideBarProps) => {
    const sidebarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsSideBarOpen(false)
            }
        }

        if (isSideBarOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isSideBarOpen, setIsSideBarOpen])
    return (
        <div
            ref={sidebarRef}
            className={`fixed left-0 top-0 z-20 h-screen w-64 md:w-72 bg-gradient-to-b from-purple-50 to-white shadow-2xl transition-transform duration-300 ${isSideBarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <img
                        src={brainly}
                        alt="Brainly Logo"
                        className="w-10 h-10 rounded-lg shadow-sm"
                    />
                    <h1 className="text-xl md:text-2xl font-bold text-purple-700">
                        Brainly
                    </h1>
                </div>

                {/* Close Button */}
                <button
                    onClick={() => setIsSideBarOpen(false)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-gray-600 hover:text-gray-800"
                    aria-label="Close sidebar"
                    title="Close"
                >
                    <CrossIcon />
                </button>
            </div>

            {/* Content Filters */}
            <div className="p-4 md:p-6">
                <p className="text-xs uppercase font-semibold text-gray-500 mb-4 tracking-wider">
                    Filter by Type
                </p>
                <div className="space-y-2">
                    <SideBarItems 
                        text="All" 
                        icon={<span>📋</span>} 
                        onClick={() => onFilterChange("all")}
                        isActive={selectedFilter === "all"}
                    />
                    <SideBarItems 
                        text="Twitter" 
                        icon={<XIcon />}
                        onClick={() => onFilterChange("twitter")}
                        isActive={selectedFilter === "twitter"}
                    />
                    <SideBarItems 
                        text="YouTube" 
                        icon={<YouTubeIcon />}
                        onClick={() => onFilterChange("youtube")}
                        isActive={selectedFilter === "youtube"}
                    />
                    <SideBarItems 
                        text="Reddit" 
                        icon={<Reddit />}
                        onClick={() => onFilterChange("reddit")}
                        isActive={selectedFilter === "reddit"}
                    />
                </div>
            </div>
        </div>
    )
}

export default SideBar