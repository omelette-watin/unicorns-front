import { ThemeProvider } from "next-themes"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { UserContext } from "../contexts/user.context"
import { me } from "../services/auth.service";

import Layout from "../components/layout/Layout"
import AuthorizationError from "../components/errors/authorization/AuthorizationError"
import "../styles/global.css"
import "../styles/helpers.css"

const App = ({ Component, pageProps }) => {
  const [user, setUser] = useState(null)
  const router = useRouter()

  const userAuth = async () => {
    const token = localStorage.getItem("token")

    if (token) {
      const authUser = await me(token)

      if (authUser) {
        setUser(authUser)
      } else {
        localStorage.removeItem("token")
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }

  useEffect(async () => {
    await userAuth()
  }, [])

  useEffect(() => {
    router.events.on("routeChangeStart", userAuth)
  }, [])

  if (pageProps.protected && !user) {
    return (
      <ThemeProvider disableTransitionOnChange={true}>
        <Layout title={"Non autorisé"}>
          <AuthorizationError/>
        </Layout>
      </ThemeProvider>
    )
  }

  if (pageProps.protected && user && pageProps.userTypes && pageProps.userTypes.indexOf(user.role) === -1) {
    return (
      <UserContext.Provider value={user}>
        <ThemeProvider disableTransitionOnChange={true}>
          <Layout title={"Non autorisé"}>
            <AuthorizationError/>
          </Layout>
        </ThemeProvider>
      </UserContext.Provider>
    )
  }

  if (pageProps.layout === false) {
    return (
      <UserContext.Provider value={user}>
        <ThemeProvider disableTransitionOnChange={true}>
          <Component {...pageProps} />
        </ThemeProvider>
      </UserContext.Provider>
    )
  }

  return (
    <UserContext.Provider value={user}>
      <ThemeProvider disableTransitionOnChange={true}>
        <Layout title={pageProps.title}>
          <Component {...pageProps}/>
        </Layout>
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default App