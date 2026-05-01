import { createContext, useContext, useState, type ReactNode } from "react"

type AuthContextType = {
  isSignedIn: boolean
  signIn: (token: string) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isSignedIn, setIsSignedIn] = useState(Boolean(localStorage.getItem("token")))

  const signIn = (token: string) => {
    localStorage.setItem("token", token)
    setIsSignedIn(true)
  }

  const signOut = () => {
    localStorage.removeItem("token")
    setIsSignedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return authContext
}
