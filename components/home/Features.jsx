import styles from "./Features.module.css"

const FeaturesData = [
  {
    title: "Liberté d'opinion",
    image: "icon-onboarding.svg",
    text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit.",
  },
  {
    title: "100% gratuit",
    image: "icon-online.svg",
    text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit?",
  },
  {
    title: "Open API",
    image: "icon-api.svg",
    text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit!",
  },
]

const Feature = ({ title, text, image }) => (
  <div className={styles.feature}>
    <div className={styles.image}>
      <img src={`/images/${image}`} alt={`${title} image`} />
    </div>
    <div className={styles.title}>
      <h3>{title}</h3>
    </div>

    <div className={styles.text}>{text}</div>
  </div>
)

const Features = () => {
  return (
    <section className={styles.features}>
      <div className={`container p-all`}>
        <div className={styles.headings}>
          <h1>
            Pourquoi choisir <strong>Unicorn</strong> ?
          </h1>
          <p>
            Itineris tramitems resistere, tanquam ferox brodium. Nomens
            crescere! Ubi est bassus zelus?
          </p>
        </div>
        <div className={styles.content}>
          {FeaturesData.map((feature) => (
            <Feature
              text={feature.text}
              title={feature.title}
              image={feature.image}
              key={feature.title}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
