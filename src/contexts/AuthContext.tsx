import { createContext, ReactNode, useEffect, useState } from "react";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies"

import { api } from "../services/apiClient";
import { useRadioGroupContext } from "@chakra-ui/react";

type User = {
  email: string,
  id: string;
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  destroyCookie(undefined, 'monipaep.token')
  destroyCookie(undefined, 'monipaep.refreshToken')
  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'monipaep.token': token } = parseCookies()

    if(token) {
      api.get('/systemuser/me').then(response => {
        const { email, id } = response.data
        setUser({ email, id })
      })
      .catch(() => {
        signOut()
      })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.get('systemuser/login', {
        auth: {
          username: email,
          password,
        }
      })
      const { token, refreshToken } = response.data

      setCookie(undefined, 'monipaep.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })

      setCookie(undefined, 'monipaep.refreshToken', refreshToken.id, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })
      
      setUser({
        email,
        id: refreshToken.systemUserId
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}