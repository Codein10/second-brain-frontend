import { type ReactElement } from 'react'

interface Buttonprops {
  varient: "primary" | "secondary",
  text: string,
  startIcon?: ReactElement,
  onClick?: () => void
  fullWidth?: boolean
  disabled?: boolean
  center?:boolean
}

const varientClass = {
  "primary": "bg-purple-200 text-purple-400",
  "secondary": "bg-purple-600 text-white",
}

const defaultstyle = "px-4 py-2 rounded-md font-light flex items-center w-40  m-2"

const Button = ({ varient, text, startIcon, onClick, fullWidth,center, disabled }: Buttonprops) => {

  return <button onClick={onClick} className={varientClass[varient] + " " + defaultstyle + `${fullWidth ? " w-full flex justify-center items-center bg-purple-600 text-white" : ""} ${disabled ? "opacity-50 cursor-not-allowed " : ""} ${center?"flex justify-center items-center":""}`} >
    <div className={fullWidth ? " " : 'p-2'}>
      {startIcon}
    </div>
    {text}
  </button>
}

export default Button