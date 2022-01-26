import styles from "./SearchForm.module.css"
import { GoSearch } from "react-icons/go"
import { ImCross } from "react-icons/im"
import { FaRandom } from "react-icons/fa"
import Router from "next/router"
import { useState } from "react"
import { getRandomPost } from "../../services/post.service"

const SearchForm = () => {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [order, setOrder] = useState("latest")
  const [views, setViews] = useState(false)
  const [comments, setComments] = useState(false)
  const [toggle, setToggle] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    Router.push(
      `/blog?${title ? `q=${title}` : ""}${
        category ? `&category=${category}` : ""
      }${order === "latest" ? "" : `&order=${order}`}`
    )
  }

  const randomPost = () => {
    getRandomPost().then((res) => {
      console.log(res)
      Router.push(`/blog/${res.randomPost._id}`)
    })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.search_form}>
      <div className={styles.default_search}>
        <div className={styles.default_inputs}>
          <input
            type="text"
            placeholder={"Chercher par titre"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete={"on"}
          />
          <span> ou </span>
          <input
            type="text"
            placeholder={"Chercher par catégorie"}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            autoComplete={"on"}
          />
        </div>

        {!toggle && (
          <div className={styles.default_btns}>
            <button type={"submit"} className={"btn"}>
              <GoSearch />
              Rechercher
            </button>
            <div
              className={`btn ${styles.open_btn}`}
              onClick={() => {
                setToggle(true)
              }}
            >
              Options de recherche avancée
            </div>
          </div>
        )}
        {toggle && (
          <div className={styles.default_btns}>
            <div
              className={styles.close_btn}
              onClick={() => {
                setToggle(false)
              }}
            >
              <ImCross />
            </div>
          </div>
        )}
      </div>
      {toggle && (
        <div className={styles.advanced_search}>
          <div className={styles.order_inputs}>
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
                  }
                }}
              />
              Les plus anciens
            </label>
          </div>
          <label>
            <input
              type="checkbox"
              checked={views}
              onChange={() => {
                {
                  setViews(!views)
                }
              }}
            />
            Les plus vus
          </label>
          <label>
            <input
              type="checkbox"
              checked={comments}
              onChange={() => {
                {
                  setComments(!comments)
                }
              }}
            />
            Les plus commentés
          </label>
          <div className={styles.advanced_btns}>
            <button type={"submit"} className={"btn"}>
              <GoSearch />
              Rechercher
            </button>
            <span>ou</span>
            <button
              className={` ${styles.random} btn`}
              onClick={() => {
                setIsLoading(true)
                randomPost()
              }}
              disabled={isLoading}
            >
              <FaRandom /> Article aléatoire
            </button>
          </div>
        </div>
      )}
    </form>
  )
}

export default SearchForm
