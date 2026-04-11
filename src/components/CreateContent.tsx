
import CrossIcon from '../assets/icons/CrossIcon'

const CreateContent = ({ open, onclose }: { open: boolean; onclose: () => void }) => {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <button
                type="button"
                className="absolute inset-0 bg-slate-900/60"
                onClick={onclose}
                aria-label="Close modal"
            />
            <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-4 shadow-xl">
                <div className="flex justify-end">
                    <button type="button" onClick={onclose} className="p-1" aria-label="Close">
                        <CrossIcon />
                    </button>
                </div>
                <div>
                    <Input type="text" placeholder="title" />
                    <Input type="text" placeholder="link" />
                </div>
            </div>
        </div>
    )
}


const Input = ({ type, placeholder }: { type: string; placeholder: string }) => {
    return <div className='rounded m-5 border'>
        <input type={type} placeholder={placeholder} />
    </div>
}

export default CreateContent