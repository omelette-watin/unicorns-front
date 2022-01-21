import styles from "./PostLayout.module.css"
import Date from "../helpers/Date"
import Heure from "../helpers/Heure"
import Link from "next/link"
import { ImEye } from "react-icons/im"
import { MdOutlineComment } from "react-icons/md"
import { useEffect, useState } from "react"
import {
  createComment,
  deleteComment,
  getCommentById,
  getCommentsByPostId,
} from "../../services/comment.service"
import { useUser } from "../../contexts/user.context"
import { logout } from "../../services/auth.service"
import Router from "next/router"

const PostLayout = ({ post }) => {
  const [comments, setComments] = useState([])
  const [commentContent, setCommentContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()

  useEffect(async () => {
    if (post.comments) {
      getCommentsByPostId(post._id)
        .then((res) => {
          const commentsFetched = res.result
          setComments(commentsFetched)
        })
        .catch((e) => {
          console.log(e.response.data.message || e.message)
        })
    }
  }, [])

  const handleDelete = (e) => {
    const commentId = e.target.value
    const token = localStorage.getItem("token")
    deleteComment(token, commentId)
      .then(() => {
        setComments(comments.filter((comment) => comment._id !== commentId))
      })
      .catch((e) => {
        console.log(e.response.data.message || e.message)
        logout()
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    setIsLoading(true)

    if (commentContent) {
      createComment(token, post._id, { content: commentContent })
        .then((res) => {
          setCommentContent("")
          setIsLoading(false)
          getCommentById(res.id).then((res) => {
            console.log(res)
            const newComments = [res.comment, ...comments]
            setComments(newComments)
          })
        })
        .catch((e) => {
          setIsLoading(false)
          console.log(e.response.data.message || e.message)
          Router.push("/login")
        })
    } else {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.blog_wrapper}>
      <div className={`${styles.blog_container} container p-all`}>
        <div className={styles.post}>
          <h2>{post.title}</h2>
          {post.category && (
            <p className={styles.categories}>
              {post.category.map((c) => {
                return (
                  <span key={c}>
                    <Link href={`/blog?category=${c}`}>
                      <a>{c}</a>
                    </Link>
                  </span>
                )
              })}
            </p>
          )}
          <p className={styles.general_infos}>
            Publié le <Date dateString={post.publishedAt} />
            {post.modifiedAt
              ? ` et modifié le ${(<Date dateString={post.modifiedAt} />)}`
              : null}{" "}
            par{" "}
            <Link href={`/users/${post.authorId}`}>
              <a className={styles.author}>@{post.authorName}</a>
            </Link>
          </p>
          <p className={styles.content}>{post.content}</p>
          <p className={styles.stats}>
            {comments.length} <MdOutlineComment />
            {post.views} <ImEye />
          </p>
        </div>
        <div className={styles.comments}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={"Laisser un commentaire"}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <button disabled={isLoading} type="submit" className={`btn`}>
              {isLoading ? "Envoi ..." : "Envoyer"}
            </button>
          </form>
          {comments.map((comment) => {
            return (
              <div key={comment._id} className={styles.comment}>
                <p className={styles.comment_content}>
                  &laquo; {comment.content} &raquo;
                </p>
                <p className={styles.comment_infos}>
                  Posté le <Date dateString={comment.createdAt} /> à{" "}
                  <Heure dateString={comment.createdAt} /> par{" "}
                  <Link href={`/users/${post.authorId}`}>
                    <a className={styles.author}>@{post.authorName}</a>
                  </Link>
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PostLayout
