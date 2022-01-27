import { countAllUser } from "../services/user.service"
import Hero from "../components/home/Hero"
import Features from "../components/home/Features"
import About from "../components/home/About"
import LastPosts from "../components/home/LastPosts"
import { useUser } from "../contexts/user.context"
import { addViewToSite } from "../services/view.controller"
import { getAllPublishedPosts } from "../services/post.service"

const Home = ({ userCount, lastPosts }) => {
  const { user } = useUser()

  return (
    <>
      <Hero count={user ? userCount - 1 : userCount} />
      <Features />
      <About />
      <LastPosts posts={lastPosts} />
    </>
  )
}

export async function getServerSideProps() {
  const userCount = await countAllUser()
  const lastPosts = await getAllPublishedPosts(1, "", "", "latest", "", "", 3)
  await addViewToSite()
  return {
    props: {
      lastPosts: lastPosts.result,
      userCount,
    },
  }
}

export default Home
