import Head from "next/head"
import RegisterForm from "../components/forms/RegisterForm"

const Register = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " - " : null} Unicorn's Blog </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RegisterForm />
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      title: "Inscription",
      layout: false,
    },
  }
}

export default Register
