import styles from "./PostLayout.module.css"
import Date from "../helpers/Date"
import Heure from "../helpers/Heure"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  createComment,
  deleteComment,
  getCommentById,
  getCommentsByPostId,
  updateComment,
} from "../../services/comment.service"
import { HiDotsVertical } from "react-icons/hi"
import { ImCross } from "react-icons/im"
import { MdEdit } from "react-icons/md"
import { FaTrashAlt } from "react-icons/fa"
import { useUser } from "../../contexts/user.context"
import Router from "next/router"

const PostLayout = ({ post }) => {
  const [comments, setComments] = useState([])
  const [commentContent, setCommentContent] = useState("")
  const [editContent, setEditContent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [toggle, setToggle] = useState(null)
  const [edit, setEdit] = useState(null)
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

  const handleDelete = (commentId) => {
    const token = localStorage.getItem("token")
    deleteComment(token, commentId)
      .then(() => {
        setComments(comments.filter((comment) => comment._id !== commentId))
      })
      .catch((e) => {
        console.log(e.response.data.message || e.message)
        Router.push("/login")
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    setIsLoading(true)

    if (commentContent) {
      if (token) {
        createComment(token, post._id, { content: commentContent })
          .then((res) => {
            setCommentContent("")
            setIsLoading(false)
            getCommentById(res.id).then((res) => {
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
        Router.push("/login")
      }
    } else {
      setIsLoading(false)
    }
  }

  const handleEdit = (e, commentId) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    setIsLoading(true)
    updateComment(token, commentId, { content: editContent })
      .then((res) => {
        getCommentById(res.id).then((res) => {
          const indexEditedComment = comments.findIndex(
            (comment) => comment._id === commentId
          )
          const newComments = comments.slice()
          newComments[indexEditedComment] = res.comment

          setComments(newComments)
          setIsLoading(false)
          setEdit(null)
        })
      })
      .catch((e) => {
        setIsLoading(false)
        console.log(e.response.data.message || e.message)
        Router.push("/login")
      })
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
          <p className={styles.stats}>{post.views} vues</p>
        </div>
        <div className={styles.comments}>
          <p>Commentaires ({comments.length})</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={"Laisser un commentaire"}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <button
              disabled={isLoading || !commentContent}
              type="submit"
              className={`btn`}
            >
              {isLoading ? "Envoi" : "Envoyer"}
            </button>
          </form>
          {comments.map((comment) => {
            return (
              <div key={comment._id} className={styles.comment}>
                {edit !== comment._id && (
                  <>
                    <p className={styles.comment_content}>
                      &laquo; {comment.content} &raquo;
                    </p>
                    <p className={styles.comment_infos}>
                      Posté le <Date dateString={comment.createdAt} /> à{" "}
                      <Heure dateString={comment.createdAt} /> par{" "}
                      <Link href={`/users/${post.authorId}`}>
                        <a className={styles.author}>@{comment.authorName}</a>
                      </Link>
                    </p>
                  </>
                )}
                {user && user._id === comment.authorId && edit === comment._id && (
                  <form
                    className={styles.edit_form}
                    onSubmit={(e) => {
                      handleEdit(e, comment._id)
                    }}
                  >
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      placeholder={"Modifier le commentaire"}
                      autoFocus={true}
                      cols={"80"}
                      rows={"3"}
                    />

                    <button
                      disabled={isLoading}
                      type="submit"
                      className={`btn`}
                    >
                      {isLoading ? "Envoi" : "Modifier"}
                    </button>
                    <button
                      className={`btn ${styles.cancel}`}
                      onClick={() => {
                        setEdit(null)
                        setToggle(null)
                      }}
                    >
                      Annuler
                    </button>
                  </form>
                )}
                {user &&
                  user._id === comment.authorId &&
                  toggle !== comment._id &&
                  edit !== comment._id && (
                    <HiDotsVertical
                      className={styles.edit}
                      onClick={() => setToggle(comment._id)}
                    />
                  )}

                {user &&
                  user._id === comment.authorId &&
                  toggle === comment._id && (
                    <ImCross
                      color={"var(--red)"}
                      className={styles.edit}
                      onClick={() => setToggle(null)}
                    />
                  )}

                {user &&
                  user._id === comment.authorId &&
                  toggle === comment._id && (
                    <div className={styles.edit_menu}>
                      <p
                        onClick={() => {
                          setEdit(comment._id)
                          setToggle(null)
                          setEditContent(comment.content)
                        }}
                      >
                        <MdEdit /> Modifier
                      </p>
                      <p
                        onClick={() => {
                          handleDelete(comment._id)
                        }}
                      >
                        <FaTrashAlt /> Supprimer
                      </p>
                    </div>
                  )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PostLayout
