import styles from "./Hero.module.css"
import { useUser } from "../../contexts/user.context"
import Link from "next/link"
import { useCountUp } from "react-countup"

const Hero = ({ count }) => {
  const { user } = useUser()
  useCountUp({
    ref: "counter",
    start: 0,
    end: count,
    delay: 0,
    suffix: " personnes",
    duration: count / 4,
  })
  return (
    <section className={styles.hero_wrapper}>
      <div className={`${styles.container} container p-all`}>
        <div className={styles.logo}>
          <img src="/images/ico.svg" alt="" />
        </div>
        <div className={styles.intro}>
          <h1>
            Votre <strong>Opinion</strong> compte
          </h1>
          <div className={styles.content}>
            <p className={styles.pitch}>
              Cur tabes potus? Neuter bursa saepe tractares tumultumque est.
              Sectam ridetiss, tanquam regius luna. Neuter bursa saepe tractares
              tumultumque est. Sectam ridetiss, tanquam regius luna. Cur tabes
              potus?
            </p>
            <div className={styles.users}>
              <div id="counter" className={styles.counter}>
                0 personnes
              </div>

              <div>
                nous ont déjà rejoint.
                {user ? (
                  <span>
                    {" "}
                    Et vous <strong>{user.username}</strong> bien sûr ❤️ !
                  </span>
                ) : (
                  <span>
                    {" "}
                    Pourquoi pas{" "}
                    <strong>
                      <Link href={"/register"}>
                        <a>vous</a>
                      </Link>
                    </strong>{" "}
                    ?
                  </span>
                )}
              </div>
            </div>

            <div className={styles.links}>
              <Link href={"/#latest-posts"}>
                <a className={styles.btn}>Voir les derniers articles</a>
              </Link>
              {user ? (
                <Link href={"/dashboard"}>
                  <a className={`btn gradient`}>Mon Dashboard</a>
                </Link>
              ) : (
                <Link href={"/register"}>
                  <a className={`btn gradient`}>Créer un compte</a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
