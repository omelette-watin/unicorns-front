import styles from "./DashboardLayout.module.css"
import Menu from "./menus/Menu"

const DashboardLayout = ({ children, secondTitle }) => {
  return (
    <div className={styles.dashboard_wrapper}>
      <div className={`${styles.dashboard_container}`}>
        <Menu title={secondTitle} />
        <div className={`p-x ${styles.children_container}`}>{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
