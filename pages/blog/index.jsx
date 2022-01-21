import BlogLayout from "../../components/blog/BlogLayout"
import { useEffect, useState } from "react"
import Router from "next/router"
import { getAllPublishedPosts } from "../../services/post.service"
import ReactPaginate from "react-paginate"
import PostCard from "../../components/cards/PostCard"

const AllPosts = (props) => {
  const [isLoading, setLoading] = useState(false)
  const startLoading = (url) => {
    if (url.includes("blog")) {
      setLoading(true)
    }
  }
  const stopLoading = (url) => {
    if (url.includes("blog")) {
      setLoading(false)
    }
  }

  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading)
    Router.events.on("routeChangeComplete", stopLoading)

    return () => {
      Router.events.off("routeChangeStart", startLoading)
      Router.events.off("routeChangeComplete", stopLoading)
    }
  }, [])

  const handlePageClick = ({ selected: selectedPage }) => {
    Router.push(
      `/blog?page=${selectedPage + 1}${
        props.currentQuery.search ? `&q=${props.currentQuery.search}` : ""
      }${
        props.currentQuery.order === "oldest"
          ? `&order=${props.currentQuery.order}`
          : ""
      }${
        props.currentQuery.category
          ? `&category=${props.currentQuery.category}`
          : ""
      }`
    )
  }

  let content
  if (isLoading)
    content = (
      <div className={"loading_wrapper"}>
        <div className="lds-ellipsis">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    )
  else {
    content = (
      <ul>
        {props.posts.map((post) => {
          return (
            <li key={post._id}>
              <PostCard post={post} />
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <>
      <BlogLayout>
        <div className="container">
          <p style={{ marginLeft: "1rem" }}>
            {props.totalCount
              ? `Page ${props.currentPage} sur environ ${props.totalCount} résultats`
              : "Aucun résultat pour votre recherche"}
          </p>
          <div className="posts">{content}</div>

          {props.totalCount > 4 && (
            <ReactPaginate
              previousLabel={"< Précédent"}
              nextLabel={"Suivant >"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              activeClassName={"active"}
              containerClassName={"pagination"}
              pageClassName={"pages"}
              pageCount={props.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
            />
          )}
        </div>
      </BlogLayout>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const search = query.q || ""
  const category = query.category || ""
  const order = query.order || "latest"
  const page = parseInt(query.page) || 1
  const posts = await getAllPublishedPosts(page, search, category, order, 4)

  return {
    props: {
      currentQuery: { search, order, category },
      totalCount: posts.meta.totalCount,
      pageCount: posts.meta.pageCount,
      currentPage: posts.meta.currentPage,
      perPage: posts.meta.perPage,
      posts: posts.result,
      title: "Blog",
    },
  }
}

export default AllPosts
