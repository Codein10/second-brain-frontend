
import { useRef, useState } from 'react';
import CrossIcon from '../assets/icons/CrossIcon'
import Input from './Input';
import axios from 'axios';
import Button from './Button';

 const ContentType= {
    Youtube : "youtube",
    Twitter :"twitter",
    Reddit : "reddit"
}

const CreateContent = ({ open, onclose }: { open: boolean; onclose: () => void }) => {
    if (!open) return null
     const BASE_URL = import.meta.env.VITE_BACKEND_URL_PROD;

    const linkRef = useRef<HTMLInputElement>(null)
    const titleRef = useRef<HTMLInputElement>(null)
     const [type,settype]=useState(ContentType.Youtube)

    async function handleCreateContent() {
        try {
            const title = titleRef.current?.value;
            const link = linkRef.current?.value;
            
            await axios.post(`${BASE_URL}/api/v1/content`,
                { title, link, type },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            alert("Content created successfully");
            onclose()
        } catch (error) {
            alert(error);
        }

    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <button
                type="button"
                className="absolute inset-0 bg-slate-900/60"
                onClick={onclose}
                aria-label="Close modal"
            />
            <div className="relative z-10 max-w-md rounded-lg bg-white p-4 shadow-xl">
                <div className="flex justify-end">
                    <button type="button" onClick={onclose} className="p-1" aria-label="Close">
                        <CrossIcon />
                    </button>
                </div>
                <div>
                    <Input reference={titleRef} type="text" placeholder="title" />
                    <Input reference={linkRef} type="text" placeholder="link" />
                    <h2>Type</h2>
                    <div className='flex gap-2'>
                        <Button disabled={false} fullWidth={false} onClick={() => settype(ContentType.Youtube)} varient={type===ContentType.Youtube ? "secondary" : "primary"} text="Youtube" center={true} />
                        <Button disabled={false} fullWidth={false} onClick={() => settype(ContentType.Twitter)} varient={type===ContentType.Twitter ? "secondary" : "primary"} text="Twitter" center={true} />
                        <Button disabled={false} fullWidth={false} onClick={() => settype(ContentType.Reddit)} varient={type===ContentType.Reddit ? "secondary" : "primary"} text="Reddit" center={true} />
                    </div>
                    <div className="flex justify-center items-center">
                        <Button onClick={handleCreateContent} disabled={false} fullWidth={true} varient="primary" text="Create Content" />
                    </div>
                </div>
            </div>
        </div>
    )
}




export default CreateContent