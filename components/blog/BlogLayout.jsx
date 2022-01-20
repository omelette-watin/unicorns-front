import styles from "./BlogLayout.module.css"

const BlogLayout = ({ children }) => {
  return (
    <div className={styles.blog_wrapper}>
      <div className={`${styles.blog_container} container p-all`}>
        {children}
      </div>
    </div>
  )
}

export default BlogLayout
