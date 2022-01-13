import Head from "next/head"
import LoginForm from "../components/forms/LoginForm"

const Login = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " - " : null} Unicorn's Blog </title>
      </Head>
      <LoginForm />
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      title: "Connexion",
      layout: false,
    },
  }
}

export default Login
