import { getPublishedPostById } from "../../services/post.service"
import PostLayout from "../../components/blog/PostLayout"
import { addViewToPost } from "../../services/view.service"

const Post = ({ post, currentComment }) => {
  return <PostLayout post={post} comment={currentComment} />
}

export async function getServerSideProps({ params, query }) {
  const postId = params.id
  await addViewToPost(postId)
  const post = await getPublishedPostById(postId)
  const currentComment = query.current_comment || ""
  return {
    props: {
      post: post,
      title: `${post.title} - Blog`,
      currentComment,
    },
  }
}

export default Post
