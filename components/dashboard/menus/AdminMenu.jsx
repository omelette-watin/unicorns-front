import styles from "./Menu.module.css"
import Link from "next/link"
import { FaCog, FaPray, FaRegComments, FaTools, FaUsers } from "react-icons/fa"
import {
  RiArticleLine,
  RiDraftLine,
  RiHeart3Fill,
  RiUser3Fill,
} from "react-icons/ri"

const AdminMenu = ({ title, toggled }) => {
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
          <Link href={"/dashboard/my/favs"}>
            <a className={title === "Mes favoris" ? styles.active : null}>
              <RiHeart3Fill /> Mes Favoris
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
          <Link href={"/dashboard/users"}>
            <a
              className={
                title === "Gérer les utilisateurs" ? styles.active : null
              }
            >
              <FaUsers /> Utilisateurs
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/dashboard/requests"}>
            <a
              className={title === "Gérer les requêtes" ? styles.active : null}
            >
              <FaPray /> Requêtes
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/dashboards/posts"}>
            <a
              className={title === "Gérer les articles" ? styles.active : null}
            >
              <RiArticleLine /> Posts
            </a>
          </Link>
        </li>
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

export default AdminMenu
