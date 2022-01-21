import { getPublishedPostById } from "../../services/post.service"
import PostLayout from "../../components/blog/PostLayout"
import { addViewToPost } from "../../services/view.controller"

const Post = ({ post }) => {
  console.log(post)
  return <PostLayout post={post} />
}

export async function getServerSideProps({ params }) {
  const postId = params.id
  await addViewToPost(postId)
  const post = await getPublishedPostById(postId)
  return {
    props: {
      post: post,
      title: `${post.title} - Blog`,
    },
  }
}

export default Post
