import styles from "./AuthorizationError.module.css"
import Link from "next/link"
import {RiArrowGoBackFill} from "react-icons/ri";

const AuthorizationError = () => {
    return (
        <div className={styles.error_wrapper}>
            <div className={`${styles.error} container p-all`}>
                <h1>Oups ...</h1>
                <p>Vous n'avez pas les droits pour accéder à cette page</p>

                <div className={styles.links}>
                    <Link href={"/"}>
                        <a className={styles.back}>
                            <RiArrowGoBackFill color={"inherit"}/>
                            <p>Revenir à l'accueil</p>
                        </a>
                    </Link>
                    <p>ou</p>
                    <Link href={"/login"}>
                        <a className={`btn ${styles.btn} gradient`}>
                            Se connecter
                        </a>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default AuthorizationError