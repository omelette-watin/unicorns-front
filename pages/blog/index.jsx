import BlogLayout from "../../components/blog/BlogLayout"
import { useEffect, useState } from "react"
import Router from "next/router"
import { getAllPublishedPosts } from "../../services/post.service"
import ReactPaginate from "react-paginate"
import PostCard from "../../components/cards/PostCard"
import Loading from "../../components/helpers/Loading"

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
      }${props.currentQuery.views ? `&views=${props.currentQuery.views}` : ""}${
        props.currentQuery.comments
          ? `&comments=${props.currentQuery.comments}`
          : ""
      }`
    )
  }

  let content
  if (isLoading) content = <Loading />
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
          {!isLoading && (
            <p style={{ marginLeft: "1rem" }}>
              {props.totalCount
                ? `Page ${props.currentPage} sur environ ${props.totalCount} résultats`
                : "Aucun résultat pour votre recherche"}
            </p>
          )}
          <div className="posts">{content}</div>

          {props.totalCount > 4 && !isLoading && (
            <ReactPaginate
              previousLabel={"< Précédent"}
              nextLabel={"Suivant >"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              activeClassName={"active"}
              disabledClassName={"disabled"}
              containerClassName={"pagination"}
              pageClassName={"pages"}
              pageCount={props.pageCount}
              forcePage={props.currentPage - 1}
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
  const views = query.views || ""
  const comments = query.comments || ""
  const page = parseInt(query.page) || 1
  const posts = await getAllPublishedPosts(
    page,
    search,
    category,
    order,
    views,
    comments,
    4
  )

  return {
    props: {
      currentQuery: { search, order, category, views, comments },
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
