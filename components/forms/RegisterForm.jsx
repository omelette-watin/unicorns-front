import styles from "./Forms.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { signUp } from "../../services/auth.service"

const RegisterForm = () => {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    email: "",
    username: "",
    other: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [bounce, setBounce] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    setBounce(false)

    if (password.length > 40 || password.length < 8) {
      setIsLoading(false)
      setErrors({ ...errors, password: "Doit faire entre 8 et 40 caractères" })
    }

    if (password !== confirmPassword) {
      setIsLoading(false)
      setErrors({
        ...errors,
        confirmPassword: "Les mots de passe ne correspondent pas",
      })
    }

    signUp({
      username,
      email,
      password,
    })
      .then((res) => {
        const token = res.data.token
        localStorage.setItem("token", token)

        router.push("/dashboard")
      })
      .catch((e) => {
        const res = e.response.data.message
        if (res.includes("utilisateur")) {
          setIsLoading(false)
          setErrors({ ...errors, username: res })
        }

        if (res.includes("mail")) {
          setIsLoading(false)
          setErrors({ ...errors, email: res })
        } else {
          setIsLoading(false)
          setBounce(true)
          setErrors({ ...errors, other: res })
          setPassword("")
          setConfirmPassword("")
        }
      })
  }

  return (
    <div className={styles.form_wrapper}>
      <div className={styles.logo_mobile}>
        <img src="/images/logo.svg" alt="" />
        <h3>
          Your <strong>Opinion</strong> matters !
        </h3>
      </div>
      <div className={styles.logo_desktop}>
        <img src="/images/logo.svg" alt="" />
        <h3>
          Your <strong>Opinion</strong> matters !
        </h3>
      </div>
      <form
        onSubmit={handleSubmit}
        autoComplete={"off"}
        className={`${styles.form} p-x`}
      >
        <div className={styles.headings}>
          <h2>Inscription</h2>
        </div>

        {errors.other && (
          <div
            id={"error"}
            className={`${bounce ? "bounce" : null} ${styles.error}`}
          >
            {errors.other}
          </div>
        )}

        <input
          className={errors.username ? styles.red_input : null}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setErrors({ ...errors, username: "" })
          }}
          type="text"
          name={"username"}
          id={"username"}
          required={true}
          placeholder={"Nom d'utilisateur (visible)"}
        />
        {errors.username ? (
          <p className={`bounce ${styles.error_msg}`}>{errors.username}</p>
        ) : null}

        <input
          className={errors.email ? styles.red_input : null}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setErrors({ ...errors, email: "" })
          }}
          type="email"
          name={"email"}
          id={"email"}
          required={true}
          placeholder={"Adresse e-mail"}
        />
        {errors.email ? (
          <p className={`bounce ${styles.error_msg}`}>{errors.email}</p>
        ) : null}

        <input
          className={errors.password ? styles.red_input : null}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setErrors({ ...errors, password: "" })
          }}
          type="password"
          name={"password"}
          id={"password"}
          required={true}
          placeholder={"Mot de passe"}
        />
        {errors.password ? (
          <p className={`bounce ${styles.error_msg}`}>{errors.password}</p>
        ) : null}

        <input
          className={errors.confirmPassword ? styles.red_input : null}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            setErrors({ ...errors, confirmPassword: "" })
          }}
          type="password"
          name={"confirmPassword"}
          id={"confirmPassword"}
          required={true}
          placeholder={"Confirmer le mot de passe"}
        />
        {errors.confirmPassword ? (
          <p className={`bounce ${styles.error_msg}`}>
            {errors.confirmPassword}
          </p>
        ) : null}

        <div className={styles.links}>
          <button
            disabled={isLoading}
            type="submit"
            className={`${styles.login_btn} btn`}
          >
            {isLoading ? "Envoi ..." : "Créer mon compte"}
          </button>
          <p>
            Vous avez déjà un compte ?
            <Link href={"/login"}>
              <a>Connectez-vous !</a>
            </Link>
          </p>
        </div>
        <div className={styles.home}>
          <Link href={"/"}>
            <a>Revenir sur le site</a>
          </Link>
        </div>
      </form>
      <div className={`${styles.circle} ${styles.large}`} />
      <div className={`${styles.circle} ${styles.small}`} />
    </div>
  )
}

export default RegisterForm
