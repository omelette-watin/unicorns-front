import Incoming from "../../components/Incoming"

const Doc = ({ title }) => {
  return (
    <div>
      <Incoming page={title} />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      title: "Documentation",
    },
  }
}

export default Doc
