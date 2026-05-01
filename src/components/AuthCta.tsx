import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Button from "./Button"

const AuthCta = () => {
  const navigate = useNavigate()
  const { isSignedIn, signOut } = useAuth()

  const handleSignOut = () => {
    signOut() 
  }


  return (
    <div className="flex items-center gap-2">
      {!isSignedIn ? (<Button
          onClick={() => navigate("/signin")}
          disabled={false}
          varient="primary"
          fullWidth={true}
          text="Sign In"
        />): (<Button
          onClick={handleSignOut}
          disabled={false}
          fullWidth={true}
          varient="primary"
          text="Sign Out"
        />
      )}
    </div>
  )
}

export default AuthCta
