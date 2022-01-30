import styles from "./Content.module.css"
import { useUser } from "../../../contexts/user.context"
import { useEffect, useState } from "react"
import { getCommentsByUserId } from "../../../services/comment.service"
import CommentCard from "../../cards/CommentCard"
import Link from "next/link"

const DefaultDashboardHome = () => {
  const [lastComments, setLastComments] = useState([])
  const { user } = useUser()
  useEffect(() => {
    getCommentsByUserId(user._id, 1, 5)
      .then((res) => {
        setLastComments(res.result)
      })
      .catch((e) => {
        console.log(e.response.message || e.message)
      })
  }, [])
  return (
    <>
      <div className={styles.last_comments}>
        <h3>Vos derniers commentaires</h3>
        {lastComments.map((comment) => {
          return <CommentCard comment={comment} key={comment._id} />
        })}
        <Link href={"/dashboard/my/comments"}>
          <a>Voir tous mes commentaires</a>
        </Link>
      </div>
    </>
  )
}

export default DefaultDashboardHome
