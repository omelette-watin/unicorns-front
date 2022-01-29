import styles from "./DashboardLayout.module.css"
import { useUser } from "../../contexts/user.context"
import ReaderMenu from "./menus/ReaderMenu"
import { useState } from "react"
import { RiArrowLeftLine, RiMenuUnfoldFill } from "react-icons/ri"
import AuthorMenu from "./menus/AuthorMenu"
import AdminMenu from "./menus/AdminMenu"

const DashboardLayout = ({ children, secondTitle }) => {
  const { user } = useUser()
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <div className={styles.dashboard_wrapper}>
      <div className={`${styles.dashboard_container} container p-all`}>
        {user.role === "reader" && (
          <ReaderMenu title={secondTitle} toggled={toggleMenu} />
        )}
        {user.role === "author" && (
          <AuthorMenu title={secondTitle} toggled={toggleMenu} />
        )}
        {user.role === "admin" && (
          <AdminMenu title={secondTitle} toggled={toggleMenu} />
        )}
        <div className={styles.children_container}>
          <div className={styles.toggler_desktop}>
            {toggleMenu ? (
              <RiMenuUnfoldFill
                size={28}
                color={"var(--colorDarkBlue)"}
                onClick={() => {
                  setToggleMenu(false)
                }}
              />
            ) : (
              <RiArrowLeftLine
                size={32}
                color={"var(--colorDarkBlue)"}
                onClick={() => {
                  setToggleMenu(true)
                }}
              />
            )}
          </div>
          <div className={styles.toggler_mobile}>
            {toggleMenu ? (
              <RiArrowLeftLine
                size={32}
                color={"var(--colorDarkBlue)"}
                onClick={() => {
                  setToggleMenu(false)
                }}
              />
            ) : (
              <RiMenuUnfoldFill
                size={27}
                color={"var(--colorDarkBlue)"}
                onClick={() => {
                  setToggleMenu(true)
                }}
              />
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
