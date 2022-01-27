import { useRouter } from "next/router"
import Link from "next/link"
import { useState } from "react"

import { signIn } from "../../services/auth.service"
import styles from "./Forms.module.css"

const LoginForm = ({ redirect }) => {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [bounce, setBounce] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    setBounce(false)

    signIn({
      username,
      password,
    })
      .then((res) => {
        const token = res.data.token
        localStorage.setItem("token", token)

        if (redirect) {
          router.push(redirect)
        } else {
          router.push("/")
        }
      })
      .catch((e) => {
        setPassword("")
        setError(e.response.data.message || e.message)
        setIsLoading(false)
        setBounce(true)
      })
  }

  return (
    <div className={styles.form_wrapper}>
      <div className={styles.logo_mobile}>
        <img src="/images/logo.svg" alt="unicorn logo" />
        <h3>
          Your <strong>Opinion</strong> matters !
        </h3>
      </div>
      <div className={styles.logo_desktop}>
        <img src="/images/logo.svg" alt="unicorn logo" />
        <h3>
          Your <strong>Opinion</strong> matters !
        </h3>
      </div>
      <form onSubmit={handleSubmit} className={`${styles.form} p-x`}>
        <div className={styles.headings}>
          <h2>Connection</h2>
        </div>

        {error && (
          <div
            id={"error"}
            className={`${bounce ? "bounce" : null} ${styles.error}`}
          >
            {error}
          </div>
        )}

        <input
          className={error ? styles.red_input : null}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          name="username"
          id="username"
          required={true}
          placeholder={"Adresse e-mail ou nom d'utilisateur"}
          autoComplete={"username"}
        />

        <input
          className={error ? styles.red_input : null}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
          required={true}
          placeholder={"Mot de passe"}
          autoComplete={"password"}
        />

        <div className={styles.links}>
          <button
            disabled={isLoading}
            type="submit"
            className={`${styles.login_btn} btn`}
          >
            {isLoading ? "Envoi..." : "Se connecter"}
          </button>
          <p>
            Pas encore de compte ?
            <Link
              href={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              <a>Créez-en un !</a>
            </Link>
          </p>
        </div>
        <div className={styles.home}>
          <Link href={redirect ? redirect : "/"}>
            <a>Revenir sur le site</a>
          </Link>
        </div>
      </form>
      <div className={`${styles.circle} ${styles.large}`} />
      <div className={`${styles.circle} ${styles.small}`} />
    </div>
  )
}

export default LoginForm
