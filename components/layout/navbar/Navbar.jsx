import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { RiCloseLine, RiMenuLine, RiLogoutBoxLine } from "react-icons/ri"
import { useUser } from "../../../contexts/user.context"
import styles from "./Navbar.module.css"

const Navbar = ({ active }) => {
  const { user } = useUser()
  const [toggleMenu, setToggleMenu] = useState(false)
  const router = useRouter()

  const logout = async () => {
    localStorage.removeItem("token")
    await router.replace("/login")
  }

  const links = (
    <>
      <li>
        <Link href={"/"}>
          <a
            className={active === undefined ? styles.active : null}
            onClick={() => {
              setToggleMenu(false)
              document.querySelector("body").classList.remove("no-scroll")
            }}
          >
            Accueil
          </a>
        </Link>
      </li>
      <li>
        <Link href={"/blog"}>
          <a
            className={active === "Blog" ? styles.active : null}
            onClick={() => {
              setToggleMenu(false)
              document.querySelector("body").classList.remove("no-scroll")
            }}
          >
            Blog
          </a>
        </Link>
      </li>
      <li>
        <Link href={"/doc"}>
          <a
            className={active === "Documentation" ? styles.active : null}
            onClick={() => {
              setToggleMenu(false)
              document.querySelector("body").classList.remove("no-scroll")
            }}
          >
            Docs
          </a>
        </Link>
      </li>
      <li>
        <Link href={"/doc/api"}>
          <a
            className={active === "API Reference" ? styles.active : null}
            onClick={() => {
              setToggleMenu(false)
              document.querySelector("body").classList.remove("no-scroll")
            }}
          >
            Open API
          </a>
        </Link>
      </li>
      {user ? (
        <li>
          <Link href={"/dashboard"}>
            <a
              className={active === "Dashboard" ? styles.active : null}
              onClick={() => {
                setToggleMenu(false)
                document.querySelector("body").classList.remove("no-scroll")
              }}
            >
              Dashboard
            </a>
          </Link>
        </li>
      ) : null}
    </>
  )

  return (
    <header className={styles.header} id={"header"}>
      <nav className={`${styles.navbar} flex ai-c jc-sb container p-x`}>
        <div className={styles.logo}>
          <Link href={"/"}>
            <a>
              <img src={"/images/logo.svg"} alt="Unicorn's logo" />
            </a>
          </Link>
        </div>
        <ul className={styles.links}>{links}</ul>
        {user ? (
          <div className={styles.sign}>
            <a onClick={logout} className={styles.little}>
              Se déconnecter
            </a>
          </div>
        ) : (
          <div className={styles.sign}>
            <Link href={"/login"}>
              <a className={styles.little}>Se connecter</a>
            </Link>
            <Link href={"/register"}>
              <a className={`btn gradient`}>S'inscrire</a>
            </Link>
          </div>
        )}
        <div className={styles.mobile_menu}>
          {user ? (
            <div className={styles.pad_sign}>
              <a onClick={logout} className={styles.little}>
                Se déconnecter
              </a>
            </div>
          ) : (
            <div className={styles.pad_sign}>
              <Link href={"/login"}>
                <a className={styles.little}>Se connecter</a>
              </Link>
              <Link href={"/register"}>
                <a className={`btn gradient`}>S'inscrire</a>
              </Link>
            </div>
          )}
          {toggleMenu ? (
            <RiCloseLine
              color={"var(--colorDarkBlue)"}
              className={styles.mobile_menu_close}
              size={27}
              onClick={() => {
                setToggleMenu(false)
                document.querySelector("body").classList.remove("no-scroll")
              }}
            />
          ) : (
            <RiMenuLine
              color={"var(--colorDarkBlue)"}
              size={27}
              onClick={() => {
                setToggleMenu(true)
                document.querySelector("body").classList.add("no-scroll")
              }}
            />
          )}
          {toggleMenu && (
            <div className={styles.mobile_menu_container}>
              <div className={styles.mobile_menu_content}>
                <ul className={styles.mobile_links}>{links}</ul>
                {user ? (
                  <div className={styles.mobile_sign}>
                    <a
                      onClick={() => {
                        setToggleMenu(false)
                        document
                          .querySelector("body")
                          .classList.remove("no-scroll")
                        logout()
                      }}
                      className={`${styles.little} ${styles.dc}`}
                    >
                      <RiLogoutBoxLine
                        color={"var(--colorDarkblue)"}
                        size={27}
                      />
                      <p>Se déconnecter</p>
                    </a>
                  </div>
                ) : (
                  <div className={styles.mobile_sign}>
                    <Link href={"/login"}>
                      <a className={styles.little}>Se connecter</a>
                    </Link>
                    <Link href={"/register"}>
                      <a className={`btn gradient`}>S'inscrire</a>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
