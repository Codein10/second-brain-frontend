import Button from '../components/Button'
import '../index.css'
import ShareIcon from '../assets/icons/ShareIcon'
import AddIcon from '../assets/icons/AddIcon'
import Card from '../components/Card'
import CreateContent from '../components/CreateContent'
import { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import MenuIcon from '../assets/icons/MenuIcon'

function DashBoard() {
  const [modalopen, setmodalopen] = useState(false)
  const { content, fetchContent } = useContent()
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)


  useEffect(() => {
    fetchContent()
  }, [modalopen])

  async function handleShare() {
    try {
      const response = await axios.post('/api/v1/brain/share',
        { share: true },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      const url = `https://localhost:5173/share/${response.data.hash}`;
      await navigator.clipboard.writeText(url);
      alert("Shareable link copied to clipboard: " + url);
    } catch (error) {
      alert(error)
    }
  }

  return <div>
    <div>
      {isSideBarOpen && <SideBar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />}
      <div className={`${isSideBarOpen ? 'ml-72' : ''} md:${isSideBarOpen ? '' : ''}  min-h-screen bg-gray-100`} >
        <CreateContent open={modalopen} onclose={() => {
          setmodalopen(false)
        }} />
        <div className='flex justify-between sticky top-0 pt-4 z-10 gap-2 bg-purple-100'>
          {!isSideBarOpen && <div className='ml-5' onClick={() => setIsSideBarOpen(true)}>
            <MenuIcon />
          </div>}
          <div className='flex gap-2 ml-auto'>
            <Button onClick={() => handleShare()} varient="primary" text="Share " startIcon={<ShareIcon />} />
            <Button onClick={() => setmodalopen(true)} varient="secondary" text="Add Content" startIcon={<AddIcon />} />
          </div>

        </div>

        <div className='flex col-gap-4 row-gap-6 flex-wrap p-4'>
          {content?.map((item: any) => (
            <Card key={item.id} id={item.id} cardtype={item.type} link={item.link} title={item.title} />
          ))}
        </div>
      </div>
    </div>
  </div>
}
export default DashBoard
