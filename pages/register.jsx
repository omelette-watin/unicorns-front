import Head from "next/head"
import RegisterForm from "../components/forms/RegisterForm"

const Register = ({ title, lastUrl }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " - " : null} Unicorn's Blog </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RegisterForm redirect={lastUrl} />
    </>
  )
}

export async function getServerSideProps({ query }) {
  const lastUrl = query.redirect || null

  return {
    props: {
      title: "Inscription",
      layout: false,
      lastUrl,
    },
  }
}

export default Register
