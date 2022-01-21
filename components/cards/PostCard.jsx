import styles from "./Cards.module.css"
import Date from "../helpers/Date"
import { ImEye } from "react-icons/im"
import Link from "next/link"
import { MdOutlineComment } from "react-icons/md"

const PostCard = ({ post }) => {
  return (
    <div className={styles.card}>
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
      <p className={styles.stats}>
        {post.comments} <MdOutlineComment />
        {post.views} <ImEye />
      </p>
    </div>
  )
}

export default PostCard
