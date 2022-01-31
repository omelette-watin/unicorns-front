import styles from "./Menu.module.css"
import Link from "next/link"
import { FaCog, FaRegComments } from "react-icons/fa"
import { RiUser3Fill } from "react-icons/ri"

const ReaderMenu = ({ title, toggled }) => {
  return (
    <div className={`${toggled && styles.closed} ${styles.menu}`}>
      <ul>
        <p>
          <RiUser3Fill /> Mon Compte
        </p>
        <li>
          <Link href={"/dashboard/my/account"}>
            <a className={title === "Mon Compte" ? styles.active : null}>
              <FaCog /> Paramètres
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/dashboard/my/comments"}>
            <a className={title === "Mes commentaires" ? styles.active : null}>
              <FaRegComments /> Mes Commentaires
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default ReaderMenu
