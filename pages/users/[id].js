import { getUserById } from "../../services/user.service"
import Date from "../../components/helpers/Date"

const User = ({ user }) => {
  return (
    <div className={"container p-all"}>
      <h1>@{user.username}</h1>
      <p>
        {user.role === "admin" ? "Administrateur" : null}
        {user.role === "author" ? "Auteur" : null}
        {user.role === "reader" ? "Utilisateur" : null} depuis le{" "}
        <Date dateString={user.createdAt} />
      </p>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const userId = params.id
  const user = await getUserById(userId)

  return {
    props: {
      user,
      title: `${user.username}`,
    },
  }
}

export default User
