import { type ReactNode } from "react"

const SideBarItems = ({ icon, text }: { icon: ReactNode; text: string }) => {
    return <div className="flex py-1 hover:bg-gray-600 rounded">
        <div >
            {icon}
        </div>
        <div className="px-2">
            {text}
        </div>
    </div>
}

export default SideBarItems