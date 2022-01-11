import { ThemeProvider } from "next-themes"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { UserContext } from "../contexts/user.context"
import { me } from "../services/auth.service";

import Layout from "../components/layout/Layout"
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


  return (
    <UserContext.Provider value={user}>
      <ThemeProvider disableTransitionOnChange={true}>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default App