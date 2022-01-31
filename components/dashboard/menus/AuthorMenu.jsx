import styles from "./Menu.module.css"
import Link from "next/link"
import { FaCog, FaRegComments, FaTools } from "react-icons/fa"
import { RiArticleLine, RiDraftLine, RiUser3Fill } from "react-icons/ri"

const AuthorMenu = ({ title, toggled }) => {
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
          <Link href={"/dashboard/my/posts"}>
            <a className={title === "Mes Articles" ? styles.active : null}>
              <RiArticleLine /> Mes Articles
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/dashboard/my/drafts"}>
            <a className={title === "Mes Articles" ? styles.active : null}>
              <RiDraftLine /> Mes Brouillons
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
      <ul>
        <p>
          <FaTools /> Gestion
        </p>
        <li>
          <Link href={"/dashboards/comments"}>
            <a
              className={
                title === "Gérer les commentaires" ? styles.active : null
              }
            >
              <FaRegComments /> Commentaires
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default AuthorMenu
