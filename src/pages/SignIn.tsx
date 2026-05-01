import { useRef } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const SignIn = () => {

const BASE_URL = import.meta.env.VITE_BACKEND_URL_PROD;
const usernameRef=useRef <HTMLInputElement>(null)
const passwordRef=useRef <HTMLInputElement>(null)
const navigate=useNavigate()
const { signIn } = useAuth()

const handleSignIn = async () => {
try {   
  const username=usernameRef.current?.value
  const password=passwordRef.current?.value
 const response = await axios.post(`${BASE_URL}/api/v1/signin` ,{
  username,
  password
})
const jwt= response?.data?.token
signIn(jwt)
navigate("/dashboard")
alert("SignIn Successfull")
}
catch(err){ 
    alert("SignIn failed: " + ((err as any).response?.data?.message || (err as any).message))
}
}
    return (
        <div className="h-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white p-10 rounded-lg shadow-lg ">
                <Input reference={usernameRef} placeholder="UserName" type="text" />
                <Input reference={passwordRef} placeholder="Password" type="password" />
                <div className="flex justify-center items-center">
                    <Button onClick={handleSignIn} disabled={false} fullWidth={true} varient="primary" text="SignIn " />
                </div>
            </div>

        </div>
    )
}

export default SignIn
