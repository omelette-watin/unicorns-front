import DashboardLayout from "../../components/dashboard/DashboardLayout"
import DashboardIndex from "../../components/dashboard/content/DashboardIndex"

const Dashboard = () => {
  return (
    <DashboardLayout>
      <DashboardIndex />
    </DashboardLayout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
      title: "Dashboard",
    },
  }
}

export default Dashboard
