import styles from "./Forms.module.css"
import { useRouter } from "next/router"
import { useState } from "react"
import Link from "next/link"
import { createDevReport } from "../../services/dev.service"

const Star = ({ marked, starId }) => {
  return (
    <span data-star-id={starId} className={styles.star} role="button">
      {marked ? "\u2605" : "\u2606"}
    </span>
  )
}

const ReportForm = () => {
  const router = useRouter()

  const [grade, setGrade] = useState(0)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [bounce, setBounce] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    createDevReport({
      grade,
      message,
    })
      .then(() => {
        router.push("/")
      })
      .catch((e) => {
        setError(e.response.data.message || e.message)
        setIsLoading(false)
        setBounce(true)
      })
  }

  const StarRating = () => {
    const [selection, setSelection] = useState(0)

    const hoverOver = (event) => {
      let val = 0
      if (event && event.target && event.target.getAttribute("data-star-id"))
        val = event.target.getAttribute("data-star-id")
      setSelection(val)
    }

    return (
      <div
        className={styles.star_wrapper}
        onMouseOut={() => hoverOver(null)}
        onClick={(e) =>
          setGrade(e.target.getAttribute("data-star-id") || grade)
        }
        onMouseOver={hoverOver}
      >
        {Array.from({ length: 5 }, (v, i) => (
          <Star
            starId={i + 1}
            key={`star_${i + 1}`}
            marked={selection ? selection >= i + 1 : grade >= i + 1}
          />
        ))}
      </div>
    )
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
      <form onSubmit={handleSubmit} className={`${styles.form} p-x`}>
        <div className={styles.headings}>
          <h2>Dev' Report</h2>
        </div>

        {error ? (
          <div
            id={"error"}
            className={`${bounce ? "bounce" : null} ${styles.error}`}
          >
            {error}
          </div>
        ) : (
          <p className={styles.rating}>À combien noteriez-vous ce site ?</p>
        )}

        <StarRating value={grade} />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id={"message"}
          required={false}
          placeholder={"Laisser un commentaire (facultatif)"}
          cols={"10"}
          rows={"5"}
        />

        <div className={styles.links}>
          <button
            disabled={isLoading}
            type="submit"
            className={`${styles.login_btn} btn`}
          >
            {isLoading ? "Envoi ..." : "Envoyer"}
          </button>
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

export default ReportForm
