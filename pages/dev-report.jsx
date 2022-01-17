import ReportForm from "../components/forms/ReportForm"
import Head from "next/head"

const Login = ({ title }) => {
  return (
    <div>
      <Head>
        <title>{title ? title + " - " : null} Unicorn's Blog </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ReportForm />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      title: "Dev' Report",
      layout: false,
    },
  }
}

export default Login
