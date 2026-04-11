import XIcon from "../assets/icons/XIcon"
import SideBarItems from "./SideBarItems"

const SideBar = () => {
    return <div className="absolute left-0 top-0 z-20 h-screen w-72 bg-white shadow-2xl">

        <div>
            <SideBarItems text="Twiteer" icon={<XIcon/>}/>
            <SideBarItems text="Twiteer" icon={<XIcon/>}/>
        </div>

    </div>


}

export default SideBar