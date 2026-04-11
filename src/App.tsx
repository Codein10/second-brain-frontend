import Button from './components/Button'
import './index.css'
import ShareIcon from './assets/icons/ShareIcon'
import AddIcon from './assets/icons/AddIcon'
import Card from './components/Card'
import CreateContent from './components/CreateContent'
import { useState } from 'react'
import SideBar from './components/SideBar'
function App() {
  const [modalopen, setmodalopen] = useState(false)
  return <div>
    <div>
      <SideBar />
      <div className='p-4 ml-72 min-h-screen bg-gray-100'>
        <CreateContent open={modalopen} onclose={() => {
          setmodalopen(false)
        }} />
        <div className='flex justify-end'>
          <Button varient="primary" text="Share " startIcon={<ShareIcon />} />
          <Button onClick={() => setmodalopen(true)} varient="secondary" text="Add Content" startIcon={<AddIcon />} />
        </div>

        <div className='flex'>
          <Card cardtype="youtube" link="https://www.youtube.com/watch?v=vhgSQvaUjSA" title="youtube" />
          <Card cardtype="twitter" link="https://x.com/Cristiano/status/2012624244748784120" title="twitter" />
        </div>

      </div>
    </div>
  </div>
}
export default App
