import styles from "./Cards.module.css"
import Date from "../helpers/Date"
import Link from "next/link"

const CommentCard = ({ comment }) => {
  return (
    <div className={`${styles.comment_card} ${styles.card}`} id={comment._id}>
      <p className={styles.content}>"{comment.content}"</p>
      <div className={styles.footer}>
        <Link href={`/blog/${comment.postId}#${comment._id}`}>
          <a>Modifier ou supprimer ce commentaire</a>
        </Link>
        <p className={styles.general_infos}>
          Publié le <Date dateString={comment.createdAt} />
          {comment.modifiedAt
            ? ` et modifié le ${(<Date dateString={comment.modifiedAt} />)}`
            : null}{" "}
        </p>
      </div>
    </div>
  )
}

export default CommentCard
