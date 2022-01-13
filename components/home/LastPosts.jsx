import styles from "./LastPosts.module.css"
import Date from "../helpers/Date"
import Link from "next/link"

const LastPostsData = [
  {
    id: "1",
    title: "On dit chocolatine",
    author: "SuperSudiste",
    publicationDate: "2021-12-30T15:03:32.013+00:00",
    text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
  },
  {
    id: "2",
    title: "JS > All",
    author: "Omelette",
    publicationDate: "2021-11-24T15:13:32.013+00:00",
    text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
  },
  {
    id: "3",
    title: "L'art d'enseigner",
    author: "Avetis",
    publicationDate: "2021-09-06T15:15:32.013+00:00",
    text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
  },
]

const Post = ({ id, title, text, author, date }) => (
  <div className={styles.post}>
    <Link href={`/blog/posts/${id}`}>
      <a />
    </Link>
    <div className={styles.title}>
      <h3>{title}</h3>
    </div>
    <div className={styles.date}>
      <Date dateString={date} />
    </div>
    <div className={styles.text}>{text}</div>
    <div className={styles.author}>@{author}</div>
  </div>
)

const LastPosts = () => {
  return (
    <section className={styles.last_posts} id={"latest-posts"}>
      <div className={"container p-all"}>
        <div className={styles.headings}>
          <h1>
            Les derniers <strong>articles</strong>
          </h1>
        </div>
        <div className={styles.content}>
          {LastPostsData.map((post) => (
            <Post
              title={post.title}
              text={post.text}
              author={post.author}
              date={post.publicationDate}
              id={post.id}
              key={post.id}
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
