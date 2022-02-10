import styles from "./Menu.module.css"
import { useUser } from "../../../contexts/user.context"
import Link from "next/link"
import { FaPray, FaRegComments, FaUsers } from "react-icons/fa"
import {
  RiArrowLeftLine,
  RiArticleLine,
  RiDraftLine,
  RiHeart3Fill,
  RiUser3Fill,
  RiArrowRightLine,
  RiArrowDownLine,
  RiArrowUpLine,
} from "react-icons/ri"
import { useState } from "react"
import { CgMenuGridR } from "react-icons/cg"

const Menu = ({ title }) => {
  const { user } = useUser()
  const [toggle, setToggle] = useState(true)
  const isAdmin = user.role === "admin"
  const isAuthor = user.role === "author"

  return (
    <div className={styles.menu_wrapper}>
      <div
        className={styles.toggler}
        onClick={() => {
          setToggle(!toggle)
        }}
      >
        {toggle ? (
          <RiArrowRightLine title={"Afficher le menu"} />
        ) : (
          <RiArrowLeftLine title={"Cacher le menu"} />
        )}
      </div>

      <div className={`${styles.menu} ${toggle ? styles.closed : ""}`}>
        <ul>
          <li>
            <Link href={"/dashboard/"}>
              <a className={!title ? styles.active : null}>
                <CgMenuGridR /> <p>Dashboard</p>
                <div className={styles.hover}>Dashboard</div>
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/dashboard/my/account"}>
              <a className={title === "Mon Compte" ? styles.active : null}>
                <RiUser3Fill /> <p>Mon compte</p>
                <div className={styles.hover}>Compte</div>
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/dashboard/my/favs"}>
              <a className={title === "Mes favoris" ? styles.active : null}>
                <RiHeart3Fill /> <p>Mes Favoris</p>
                <div className={styles.hover}>Favoris</div>
              </a>
            </Link>
          </li>
          {(isAdmin || isAuthor) && (
            <>
              <li>
                <Link href={"/dashboard/my/posts"}>
                  <a
                    className={title === "Mes Articles" ? styles.active : null}
                  >
                    <RiArticleLine /> <p>Mes Articles</p>
                    <div className={styles.hover}>Articles</div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/dashboard/my/drafts"}>
                  <a
                    className={title === "Mes Articles" ? styles.active : null}
                  >
                    <RiDraftLine /> <p>Mes Brouillons</p>
                    <div className={styles.hover}>Brouillons</div>
                  </a>
                </Link>
              </li>
            </>
          )}
          <li>
            <Link href={"/dashboard/my/comments"}>
              <a
                className={title === "Mes commentaires" ? styles.active : null}
              >
                <FaRegComments /> <p>Mes Commentaires</p>
                <div className={styles.hover}>Commentaires</div>
              </a>
            </Link>
          </li>
          {(isAdmin || isAuthor) && <div className={styles.separator} />}
          {isAdmin && (
            <>
              <li>
                <Link href={"/dashboard/users"}>
                  <a
                    className={
                      title === "Gérer les utilisateurs" ? styles.active : null
                    }
                  >
                    <FaUsers /> <p>Utilisateurs</p>
                    <div className={styles.hover}>Utilisateurs</div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/dashboard/requests"}>
                  <a
                    className={
                      title === "Gérer les requêtes" ? styles.active : null
                    }
                  >
                    <FaPray /> <p>Requêtes</p>
                    <div className={styles.hover}>Requêtes</div>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/dashboards/posts"}>
                  <a
                    className={
                      title === "Gérer les articles" ? styles.active : null
                    }
                  >
                    <RiArticleLine /> <p>Articles</p>
                    <div className={styles.hover}>Articles</div>
                  </a>
                </Link>
              </li>
            </>
          )}
          {(isAdmin || isAuthor) && (
            <>
              <li>
                <Link href={"/dashboards/comments"}>
                  <a
                    className={
                      title === "Gérer les commentaires" ? styles.active : null
                    }
                  >
                    <FaRegComments /> <p>Commentaires</p>
                    <div className={styles.hover}>Commentaires</div>
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div
        className={styles.toggler_mobile}
        onClick={() => {
          setToggle(!toggle)
        }}
      >
        {toggle ? (
          <p>
            Afficher le menu <RiArrowDownLine title={"Afficher le menu"} />
          </p>
        ) : (
          <RiArrowUpLine title={"Cacher le menu"} />
        )}
      </div>
    </div>
  )
}

export default Menu
