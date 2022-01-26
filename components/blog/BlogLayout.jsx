import styles from "./BlogLayout.module.css"
import SearchForm from "../forms/SearchForm"

const BlogLayout = ({ children }) => {
  return (
    <div className={styles.blog_wrapper}>
      <div className={`${styles.blog_container} container p-all`}>
        <h1>
          <strong style={{ color: "var(--lightBrightCyan)" }}> Blog</strong> &
          Articles
        </h1>
        <SearchForm />
        {children}
      </div>
    </div>
  )
}

export default BlogLayout
