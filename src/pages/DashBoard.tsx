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
import { useAuth } from '../context/AuthContext'
import SignIn from './SignIn'

function DashBoard() {
  const [modalOpen, setModalOpen] = useState(false)
  const { content, fetchContent, removeContent } = useContent()
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const BASE_URL = import.meta.env.VITE_BACKEND_URL_PROD;

  const { isSignedIn } = useAuth()
  useEffect(() => {
    fetchContent()
  }, [modalOpen])

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
  }

  const handleCardDelete = (contentId: string) => {
    removeContent(contentId)
  }

  // Filter content based on selected filter
  const filteredContent = selectedFilter === "all" 
    ? content 
    : content?.filter((item: any) => item.type === selectedFilter)

  async function handleShare() {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/brain/share`,
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Backdrop */}
      {isSideBarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsSideBarOpen(false)}
        />
      )}

      {/* Sidebar */}
      {isSideBarOpen && (
        <SideBar 
          isSideBarOpen={isSideBarOpen} 
          setIsSideBarOpen={setIsSideBarOpen}
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            {/* Menu Button - Mobile */}
            {!isSideBarOpen && (
              <button
                onClick={() => setIsSideBarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-gray-700"
                aria-label="Open sidebar"
                title="Menu"
              >
                <MenuIcon />
              </button>
            )}

            {/* Title - Desktop Only */}
            <div className="flex-1 hidden sm:block">
              <h1 className="text-2xl font-bold text-gray-800">My Brain</h1>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 md:gap-3 ml-auto">
              <Button
                onClick={() => handleShare()}
                varient="primary"
                text="Share"
                startIcon={<ShareIcon />}
              />
              <Button
                onClick={() => setModalOpen(true)}
                varient="secondary"
                text="Add Content"
                startIcon={<AddIcon />}
              />
            </div>
          </div>
        </header>

        {/* Create Content Modal */}
        {isSignedIn?<CreateContent
          open={modalOpen}
          onclose={() => {
            setModalOpen(false)
          }}
        />:<SignIn/>}

        {/* Content Grid */}
        <main className="flex-1 p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredContent?.map((item: any) => (
              <Card
                key={item._id}
                _id={item._id}
                cardtype={item.type}
                link={item.link}
                title={item.title}
                onDelete={handleCardDelete}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
export default DashBoard
