import { countAllUser } from "../services/user.service"
import Hero from "../components/home/Hero"
import Features from "../components/home/Features"
import About from "../components/home/About"
import LastPosts from "../components/home/LastPosts"
import { useUser } from "../contexts/user.context"
import { addViewToSite } from "../services/view.controller"

const Home = ({ userCount }) => {
  const { user } = useUser()

  return (
    <>
      <Hero count={user ? userCount - 1 : userCount} />
      <Features />
      <About />
      <LastPosts />
    </>
  )
}

export async function getServerSideProps() {
  const userCount = await countAllUser()
  await addViewToSite()
  return {
    props: {
      userCount,
    },
  }
}

export default Home