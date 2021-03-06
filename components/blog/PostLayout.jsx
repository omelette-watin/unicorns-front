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
import { addToFavs, removeFromFavs } from "../../services/post.service"
import { RiHeart3Fill } from "react-icons/ri"

const PostLayout = ({ post, comment }) => {
  const [comments, setComments] = useState([])
  const [totalComments, setTotalComments] = useState(post.comments)
  const [commentContent, setCommentContent] = useState(comment)
  const [editContent, setEditContent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [toggle, setToggle] = useState(null)
  const [edit, setEdit] = useState(null)
  const { user } = useUser(null)
  const [currentUser, setCurrentUser] = useState()
  const page = Math.ceil(comments.length / 10)

  useEffect(async () => {
    if (post.comments) {
      getCommentsByPostId(post._id, page + 1)
        .then((res) => {
          const commentsFetched = res.result
          setComments(commentsFetched)
        })
        .catch((e) => {
          console.log(e.response.data.message || e.message)
        })
    }
  }, [])

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")))
  }, [])

  const handleFav = () => {
    if (!user) {
      Router.push(`/login?redirect=/blog%23${post._id}`)
    } else {
      const token = localStorage.getItem("token")
      if (!currentUser.favs || !currentUser.favs.includes(post._id)) {
        addToFavs(token, post._id)
          .then(() => {
            const newFavs = user.favs.slice() || []
            newFavs.push(post._id)
            localStorage.setItem(
              "user",
              JSON.stringify({ ...currentUser, favs: newFavs })
            )
            setCurrentUser(JSON.parse(localStorage.getItem("user")))
          })
          .catch((e) => {
            if (e.response.status === 404) {
              Router.push("/404")
            } else {
              console.log(e.response.data.message || e.message)
              Router.push(`/login?redirect=/blog%23${post._id}`)
            }
          })
      } else {
        removeFromFavs(token, post._id)
          .then(() => {
            const newFavs =
              currentUser.favs.slice().filter((fav) => fav !== post._id) || []
            localStorage.setItem(
              "user",
              JSON.stringify({ ...currentUser, favs: newFavs })
            )
            setCurrentUser(JSON.parse(localStorage.getItem("user")))
          })
          .catch((e) => {
            if (e.response.status === 404) {
              Router.push("/404")
            } else {
              console.log(e.response.data.message || e.message)
              Router.push(`/login?redirect=/blog%23${post._id}`)
            }
          })
      }
    }
  }
  const handleDelete = (commentId) => {
    const token = localStorage.getItem("token")
    deleteComment(token, commentId)
      .then(() => {
        Router.reload()
      })
      .catch((e) => {
        if (e.response.status === 404) {
          Router.push("/404")
        } else {
          console.log(e.response.data.message || e.message)
          Router.push(`/login?redirect=/blog/${post._id}`)
        }
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
              const newComments = [res.comment, ...comments.slice()]
              if (
                (totalComments > 10 && page < 2) ||
                (page && newComments.length / page > 10)
              ) {
                newComments.pop()
              }
              setComments(newComments)
              setTotalComments(totalComments + 1)
            })
          })
          .catch((e) => {
            if (e.response.status === 404) {
              Router.push("/404")
            } else {
              console.log(e.response.data.message || e.message)
              Router.push(
                `/login?redirect=/blog/${post._id}?current_comment=${commentContent}%23comment`
              )
            }
          })
      } else {
        Router.push(
          `/login?redirect=/blog/${post._id}?current_comment=${commentContent}%23comment`
        )
      }
    } else {
      setIsLoading(false)
    }
  }

  const handleEdit = (e, commentId) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    setIsLoading(true)
    if (editContent) {
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
          if (e.response.status === 404) {
            Router.push("/404")
          } else {
            console.log(e.response.data.message || e.message)
            Router.push(`/login?redirect=/blog/${post._id}`)
          }
        })
    } else {
      setIsLoading(false)
    }
  }

  const loadMore = () => {
    if (totalComments > comments.length) {
      getCommentsByPostId(post._id, page + 1)
        .then((res) => {
          const newComments = [...comments, ...res.result]
          setComments(newComments)
        })
        .catch((e) => {
          console.log(e.response.data.message || e.message)
        })
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
            Publi?? le <Date dateString={post.publishedAt} />
            {post.modifiedAt
              ? ` et modifi?? le ${(<Date dateString={post.modifiedAt} />)}`
              : null}{" "}
            par{" "}
            <Link href={`/users/${post.authorId}`}>
              <a className={styles.author}>@{post.authorName}</a>
            </Link>
          </p>
          <p className={styles.content}>{post.content}</p>
          <div className={styles.footer}>
            <div className={styles.stats}>{post.views} vues</div>
            <div className={styles.favs} onClick={handleFav}>
              {currentUser &&
              currentUser.favs &&
              currentUser.favs.includes(post._id)
                ? "Supprimer des favoris"
                : "Ajouter aux favoris"}
              <RiHeart3Fill
                title={
                  currentUser &&
                  currentUser.favs &&
                  currentUser.favs.includes(post._id)
                    ? "Supprimer des favoris"
                    : "Ajouter aux favoris"
                }
                size={24}
                color={
                  currentUser &&
                  currentUser.favs &&
                  currentUser.favs.includes(post._id)
                    ? "var(--red)"
                    : ""
                }
              />
            </div>
          </div>
        </div>
        <div className={styles.comments}>
          <p>Commentaires ({totalComments})</p>
          <form onSubmit={handleSubmit} id={"comment"}>
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
              Envoyer
            </button>
          </form>
          {comments.map((comment) => {
            return (
              <div
                key={comment._id}
                id={comment._id}
                className={styles.comment}
              >
                {edit !== comment._id && (
                  <>
                    <p className={styles.comment_content}>
                      &laquo; {comment.content} &raquo;
                    </p>
                    <p className={styles.comment_infos}>
                      {comment.modifiedAt ? (
                        <span>
                          Modifi?? le <Date dateString={comment.modifiedAt} /> ??{" "}
                          <Heure dateString={comment.modifiedAt} /> par{" "}
                        </span>
                      ) : (
                        <span>
                          Post?? le <Date dateString={comment.createdAt} /> ??{" "}
                          <Heure dateString={comment.createdAt} /> par{" "}
                        </span>
                      )}
                      <Link href={`/users/${comment.authorId}`}>
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
                      disabled={isLoading || !editContent}
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
                      <button
                        onClick={() => {
                          setEdit(comment._id)
                          setToggle(null)
                          setEditContent(comment.content)
                        }}
                      >
                        <MdEdit /> Modifier
                      </button>
                      <button
                        disabled={isDeleting}
                        onClick={() => {
                          setIsDeleting(true)
                          handleDelete(comment._id)
                        }}
                      >
                        <FaTrashAlt /> Supprimer
                      </button>
                    </div>
                  )}
              </div>
            )
          })}
          {totalComments > comments.length && (
            <button
              className={`btn ${styles.loader}`}
              onClick={() => {
                loadMore()
              }}
            >
              Charger plus
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostLayout
