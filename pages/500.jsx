import ServerError from "../components/errors/server/ServerError"

const Custom5OO = () => {
  return (
    <ServerError/>
  )
}

export async function getStaticProps(){
  return {
    props: {
      title: "Erreur 500"
    }
  }
}

export default Custom5OO