import styles from "./Cards.module.css"
import Date from "../helpers/Date"
import { ImEye } from "react-icons/im"
import { RiHeart3Fill } from "react-icons/ri"
import Link from "next/link"
import { MdOutlineComment } from "react-icons/md"
import Router from "next/router"
import { addToFavs, removeFromFavs } from "../../services/post.service"
import { useEffect, useState } from "react"

const PostCard = ({ post }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  })

  const handleFav = () => {
    if (!user) {
      Router.push(`/login?redirect=/blog%23${post._id}`)
    } else {
      const token = localStorage.getItem("token")
      if (!user.favs || !user.favs.includes(post._id)) {
        addToFavs(token, post._id)
          .then(() => {
            const newFavs = user.favs.slice() || []
            newFavs.push(post._id)
            localStorage.setItem(
              "user",
              JSON.stringify({ ...user, favs: newFavs })
            )
          })
          .catch((e) => {
            console.log(e.response.data.message || e.message)
            Router.push(`/login?redirect=/blog%23${post._id}`)
          })
      } else {
        removeFromFavs(token, post._id)
          .then(() => {
            const newFavs =
              user.favs.slice().filter((fav) => fav !== post._id) || []
            localStorage.setItem(
              "user",
              JSON.stringify({ ...user, favs: newFavs })
            )
          })
          .catch((e) => {
            console.log(e.response.data.message || e.message)
            Router.push(`/login?redirect=/blog%23${post._id}`)
          })
      }
    }
  }
  return (
    <div className={styles.card} id={post._id}>
      <Link href={`/blog/${post._id}`}>
        <a className={styles.readmore}>
          <h3>{post.title}</h3>
        </a>
      </Link>
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

      <p className={styles.content_intro}>
        {post.content.slice(0, 300)} ...{" "}
        <Link href={`/blog/${post._id}`}>
          <a className={styles.readmore}>Lire la suite</a>
        </Link>
      </p>
      <div className={styles.footer}>
        <div className={styles.fav}>
          <RiHeart3Fill
            size={24}
            color={
              user && user.favs && user.favs.includes(post._id)
                ? "var(--red)"
                : ""
            }
            onClick={handleFav}
          />
        </div>
        <p className={styles.stats}>
          {post.comments} <MdOutlineComment />
          {post.views} <ImEye />
        </p>
      </div>
    </div>
  )
}

export default PostCard
