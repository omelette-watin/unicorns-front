import styles from "./LastPosts.module.css"
import Date from "../helpers/Date"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getAllPublishedPosts } from "../../services/post.service"

const Post = ({ id, title, content, author, date }) => (
  <div className={styles.post}>
    <Link href={`/blog/${id}`}>
      <a />
    </Link>
    <div className={styles.title}>
      <h3>{title}</h3>
    </div>
    <div className={styles.date}>
      <Date dateString={date} />
    </div>
    <div className={styles.text}>{content} ... </div>
    <div className={styles.author}>@{author}</div>
  </div>
)

const LastPosts = () => {
  const [lastComments, setLastComments] = useState([])
  useEffect(() => {
    getAllPublishedPosts(1, "", "", "latest", 3)
      .then((res) => {
        const commentsFetched = res.result
        setLastComments(commentsFetched)
      })
      .catch((e) => {
        console.log(e.response.data.message || e.message)
      })
  })
  return (
    <section className={styles.last_posts} id={"latest-posts"}>
      <div className={"container p-all"}>
        <div className={styles.headings}>
          <h1>
            Les derniers <strong>articles</strong>
          </h1>
        </div>
        <div className={styles.content}>
          {lastComments.map((post) => (
            <Post
              title={post.title}
              content={post.content.slice(0, 300)}
              author={post.authorName}
              date={post.publishedAt}
              id={post._id}
              key={post._id}
            />
          ))}
        </div>
        <div className={styles.link}>
          <Link href={"/blog"}>
            <a className={`btn gradient`}>Voir plus d'articles</a>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LastPosts
