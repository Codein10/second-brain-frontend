


const Input = ({ type, placeholder ,reference}: { type: string; placeholder: string; reference: any}) => {
    return <div className='m-5'>
        <input ref={reference}  className="h-10 pl-2 w-full border rounded " type={type} placeholder={placeholder} />
    </div>
}
export default Input