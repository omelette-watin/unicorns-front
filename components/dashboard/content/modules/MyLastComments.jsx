import styles from "./Modules.module.css"
import {getCommentsByUserId} from "../../../../services/comment.service"
import {useEffect, useState} from "react"
import Loading from "../../../helpers/Loading"
import {useUser} from "../../../../contexts/user.context"
import Date from "../../../helpers/Date";
import Heure from "../../../helpers/Heure";

const MyLastComments = () => {
  const [myComments, setMyComments] = useState(null)
  const { user } = useUser()

  useEffect( async () => {
    getCommentsByUserId(user._id, 1, 5)
      .then((res) => {
        setMyComments(res.result)
      })
  }, [])

  return (
    <div className={styles.module}>
      <p className={styles.title}>
        Mes derniers <span>Commentaires</span>
      </p>
      {!myComments && <Loading />}
      {myComments &&
        <ul className={styles.comments}>
          {myComments.map((comment) => {
            return <li key={comment._id}>
              <p className={styles.content}>&laquo; {comment.content} &raquo;</p>
              <p className={styles.date}>
                {comment.modifiedAt ? (
                  <span>
                    Modifié le <Date dateString={comment.modifiedAt} /> à{" "}
                    <Heure dateString={comment.modifiedAt} />
                  </span>
                ) : (
                  <span>
                    Posté le <Date dateString={comment.createdAt} /> à{" "}
                    <Heure dateString={comment.createdAt} />
                  </span>
                )}
              </p>
              <a href={`/blog/${comment.postId}`}>Voir l'article</a>
            </li>
          })}
        </ul>
      }

    </div>
  );
};

export default MyLastComments;