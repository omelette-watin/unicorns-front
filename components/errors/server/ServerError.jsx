import styles from "./ServerError.module.css"
import Link from "next/link"
import { RiArrowGoBackFill } from "react-icons/ri"

const ServerError = () => {
  return (
    <div className={styles.error_wrapper}>
      <div className={`${styles.error} container p-all`}>
        <h1>Oups ...</h1>
        <p>Il y a eu une erreur, veuillez réessayer plus tard</p>

        <div className={styles.links}>
          <Link href={"/"}>
            <a className={styles.back}>
              <RiArrowGoBackFill color={"inherit"} />
              <p>Revenir à l'accueil</p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ServerError
