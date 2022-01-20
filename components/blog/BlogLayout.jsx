import styles from "./BlogLayout.module.css"
import { useState } from "react"
import { GoSearch } from "react-icons/go"
import Router from "next/router"

const BlogLayout = ({ children }) => {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [order, setOrder] = useState("latest")
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(order)
    Router.push(
      `/blog?${search ? `q=${search}` : ""}&${
        category ? `category=${category}` : ""
      }&${order === "latest" ? "" : `order=${order}`}`
    )
  }
  return (
    <div className={styles.blog_wrapper}>
      <div className={`${styles.blog_container} container p-all`}>
        <h1>
          <strong style={{ color: "var(--lightBrightCyan)" }}> Blog</strong> &
          Articles
        </h1>
        <form onSubmit={handleSubmit} className={styles.search_form}>
          <div>
            <input
              type="text"
              placeholder={"Chercher par titre"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete={"on"}
            />
            <input
              type="text"
              placeholder={"Chercher par catégorie"}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              autoComplete={"on"}
            />
            <label>
              <input
                type="radio"
                name="order"
                value="latest"
                checked={order === "latest"}
                onChange={(e) => setOrder(e.target.value)}
              />
              Les plus récents
            </label>
            <label>
              <input
                type="radio"
                name="order"
                value="oldest"
                checked={order === "oldest"}
                onChange={(e) => {
                  {
                    setOrder(e.target.value)
                    console.log("changed")
                    console.log(order)
                  }
                }}
              />
              Les plus anciens
            </label>
          </div>
          <button type={"submit"} className={"btn"}>
            <GoSearch />
            Rechercher
          </button>
        </form>
        {children}
      </div>
    </div>
  )
}

export default BlogLayout
