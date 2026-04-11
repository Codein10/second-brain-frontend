import { type ReactElement } from 'react'

interface Buttonprops{
    varient:"primary"|"secondary",
    text:string,
    startIcon:ReactElement,
    onClick?:()=>void
}

const varientClass={
    "primary":"bg-purple-200 text-purple-400",
    "secondary":"bg-purple-600 text-white",
}

const defaultstyle="px-4 py-2 rounded-md font-light flex items-center w-40  m-2"

const Button = ({varient,text,startIcon,onClick}:Buttonprops) => {

  return <button onClick={onClick} className={varientClass[varient]+" "+defaultstyle}>
    <div className='p-2'>
    {startIcon}
    </div>
    {text}
  </button>
}

export default Button