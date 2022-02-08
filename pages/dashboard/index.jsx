import DashboardLayout from "../../components/dashboard/DashboardLayout"

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div>
        <p>Content</p>
      </div>
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
