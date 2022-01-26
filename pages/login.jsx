import Head from "next/head"
import LoginForm from "../components/forms/LoginForm"

const Login = ({ title, lastUrl }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " - " : null} Unicorn's Blog </title>
      </Head>
      <LoginForm redirect={lastUrl} />
    </>
  )
}

export async function getServerSideProps({ query }) {
  const lastUrl = query.redirect || null

  return {
    props: {
      title: "Connexion",
      layout: false,
      lastUrl,
    },
  }
}

export default Login
