import { type ReactNode } from "react"

interface SideBarItemsProps {
    icon: ReactNode
    text: string
    onClick?: () => void
    isActive?: boolean
}

const SideBarItems = ({ icon, text, onClick, isActive = false }: SideBarItemsProps) => {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                isActive 
                    ? 'bg-purple-600 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-purple-100 hover:text-purple-700 hover:shadow-sm'
            }`}
        >
            <div className="flex-shrink-0 text-lg">
                {icon}
            </div>
            <span className="flex-1 text-left text-sm md:text-base">
                {text}
            </span>
        </button>
    )
}

export default SideBarItems