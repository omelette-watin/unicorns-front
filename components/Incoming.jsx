import styles from "./Incoming.module.css"
import Link from "next/link"
import { RiArrowGoBackFill } from "react-icons/ri"


const Incoming = ({ page }) => {
    return (
        <div className={styles.incoming_wrapper}>
            <div className={`${styles.incoming} container p-all`}>
                <h1>Bientôt ici : la page <strong>{page}</strong></h1>

                <p>Merci de votre patience ❤️</p>

                <div className={styles.links}>
                    <Link href={"/"}>
                        <a className={styles.back}>
                            <RiArrowGoBackFill color={"inherit"}/>
                            <p>Revenir à l'accueil</p>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Incoming