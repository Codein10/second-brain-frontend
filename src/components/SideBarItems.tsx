import { type ReactNode } from "react"

const SideBarItems = ({ icon, text }: { icon: ReactNode; text: string }) => {
    return (
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 font-medium transition-all duration-200 hover:bg-purple-100 hover:text-purple-700 hover:shadow-sm active:bg-purple-200">
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