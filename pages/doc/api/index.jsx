import Incoming from "../../../components/Incoming"

const Api = ({ title }) => {
  return (
    <div>
      <Incoming page={title} />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      title: "API Reference",
    },
  }
}

export default Api
