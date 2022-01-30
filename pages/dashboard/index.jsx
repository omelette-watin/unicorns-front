import DashboardLayout from "../../components/dashboard/DashboardLayout"
import DefaultDashboardHome from "../../components/dashboard/content/DefaultDashboardHome"

const Dashboard = () => {
  return (
    <DashboardLayout>
      <DefaultDashboardHome />
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
