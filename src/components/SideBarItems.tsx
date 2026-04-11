import { type ReactNode } from "react"

const SideBarItems = ({ icon, text }: { icon: ReactNode; text: string }) => {
    return <div className="flex">

        <div className="p-2">
            {icon}
        </div>
        <div className="p-2">
            {text}
        </div>
    </div>
}

export default SideBarItems