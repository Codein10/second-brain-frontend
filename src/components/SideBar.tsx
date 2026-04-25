
import CrossIcon from "../assets/icons/CrossIcon"
import XIcon from "../assets/icons/XIcon"
import YouTubeIcon from "../assets/icons/YouTubeIcon"
import SideBarItems from "./SideBarItems"
import brainly from "../assets/icons/Brainly.jpg"
type SideBarProps = {
    isSideBarOpen: boolean
    setIsSideBarOpen: any

}

const SideBar = ({ isSideBarOpen, setIsSideBarOpen }: SideBarProps) => {

    return <div className={`fixed left-0 z-20 h-screen w-72 bg-white pl-10 top-0 shadow-2xl transition-transform duration-300 ${isSideBarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="pt-4 text-2xl flex items-center">
            <div >
                <img src={brainly} alt="Brainly" className="w-10 h-10" />
            </div>
            <div className="font-bold ml-2 ">
                Brainly
            </div>
            <div onClick={() => setIsSideBarOpen(false)} className="ml-auto mr-4 text-black-500 border-gray-300 border rounded-full p-1 cursor-pointer">
                <CrossIcon />
            </div>

        </div>
        <div className="pt-6 pl-6 pr-10">
            <SideBarItems text="Twiteer" icon={<XIcon />} />
            <SideBarItems text="YouTube" icon={<YouTubeIcon />} />
        </div>
    </div>


}

export default SideBar