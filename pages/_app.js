import { ThemeProvider } from "next-themes"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import '../styles/global.css'

const App = ({ Component, pageProps }) => {
  const [user, setUser] = useState(null)
  return (
    <ThemeProvider disableTransitionOnChange={true}>
      <Component {...pageProps}/>
    </ThemeProvider>
  )
}

export default App