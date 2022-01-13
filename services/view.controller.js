import api from "./api.service"

export const getSiteViews = async () => {
  const { data } = await api.get("/views")
  return data.views
}

export const getViewsByAuthorId = async (id) => {
  const { data } = await api.get(`/views/${id}`)
  return data.views
}

export const addViewToSite = async () => {
  const { data } = await api.post(
    "/views",
    {},
    {
      headers: {
        "origin-secret-validator": process.env.SECRET_ORIGIN_KEY,
      },
    }
  )
  return data
}

export const addViewToPost = async (id) => {
  const { data } = await api.post(
    `/views/${id}`,
    {},
    {
      headers: {
        "origin-secret-validator": process.env.SECRET_ORIGIN_KEY,
      },
    }
  )
  return data
}
