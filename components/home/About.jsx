import styles from "./About.module.css"

const AboutData = [
  {
    title: "Qui somme-nous ?",
    text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
  },
  {
    title: "Pourquoi Unicorn ?",
    text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
  },
  {
    title: "Des projets ?",
    text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
  },
  {
    title: "Comment soutenir le projet ?",
    text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
  },
]

const Question = ({ title, text }) => (
  <div className={styles.question}>
    <div className={styles.title}>
      <div />
      <h3>{title}</h3>
    </div>
    <div className={styles.text}>
      {text}
      <div />
    </div>
  </div>
)

const About = () => {
  return (
    <section id={"about"} className={styles.about}>
      <div className={`container p-all`}>
        <div className={styles.headings}>
          <h1>À propos</h1>
        </div>
        <div className={styles.content}>
          {AboutData.map((question, index) => (
            <Question
              title={question.title}
              text={question.text}
              key={question.title + index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
