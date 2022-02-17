import PostViewsChart from "./modules/PostViewsChart"
import styles from "./DashboardIndex.module.css"
import { useUser } from "../../../contexts/user.context"
import Link from "next/link"
import SiteViewsChart from "./modules/SiteViewsChart"
import UsersRegistrationChart from "./modules/UsersRegistrationChart"
import MyLastComments from "./modules/MyLastComments"

const DashboardIndex = () => {
  const { user } = useUser()
  const isAdmin = user.role === "admin"
  const isAuthor = user.role === "author"
  return (
    <>
      <div className={styles.path}>
        /{" "}
        <Link href={"/dashboard"}>
          <a>Dashboard</a>
        </Link>
      </div>
      <div className={styles.dashboard_index_wrapper}>
        {isAdmin && <SiteViewsChart />}
        {isAdmin && <UsersRegistrationChart />}
        {(isAdmin || isAuthor) && <PostViewsChart />}
        <MyLastComments />
      </div>

    </>
  )
}

export default DashboardIndex
