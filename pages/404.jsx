import NotFoundError from "../components/errors/notfound/NotFoundError"

const Custom404 = () => {
  return (
    <NotFoundError/>
  )
}

export async function getStaticProps(){
  return {
    props: {
      title: "Erreur 404"
    }
  }
}

export default Custom404