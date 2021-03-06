import api from "./api.service"

export const countPublishedPosts = async () => {
  const { data } = await api.get("/posts/count")
  return data.count
}

export const getAllPublishedPostsIds = async () => {
  const { data } = await api.get("/posts/ids")
  return data.ids
}

export const getRandomPost = async () => {
  const { data } = await api.get("/posts/random")
  return data
}

export const getAllPublishedPosts = async (
  page = 1,
  search = "",
  category = "",
  order = "latest",
  views = "",
  comments = "",
  limit = 10
) => {
  const { data } = await api.get(
    `/posts/?page=${page}&limit=${limit}&q=${search}&order=${order}&category=${category}&views=${views}&comments=${comments}`
  )
  return data
}

export const getPublishedPostById = async (id) => {
  const { data } = await api.get(`/posts/${id}`)
  return data.post
}

export const getPublishedPostsByUserId = async (id, page = 1, limit = 10) => {
  const { data } = await api.get(
    `/posts/user/${id}?page=${page}&limit=${limit}`
  )
  return data
}

export const getSavedPostsByUserId = async (
  token,
  id,
  page,
  search = "",
  order = "latest",
  limit = 10
) => {
  const { data } = await api.get(
    `/posts/user/saved/${id}?page=${page}&limit=${limit}&q=${search}&order=${order}`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  )
  return data
}

export const getSavedPostById = async (token, id) => {
  const { data } = await api.get(`/posts/saved/${id}`, {
    headers: {
      "x-access-token": token,
    },
  })
  return data
}

export const getFavs = async (
  token,
  page,
  search = "",
  order = "latest",
  limit = 10
) => {
  const { data } = await api.get(
    `/posts/favs?page=${page}&limit=${limit}&q=${search}&order=${order}`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  )
  return data
}

export const createPost = async (token, body) => {
  const { data } = await api.post("/posts", body, {
    headers: {
      "x-access-token": token,
    },
  })
  return data
}

export const createAndPublishPost = async (token, body) => {
  const { data } = await api.post("/posts/publish", body, {
    headers: {
      "x-access-token": token,
    },
  })
  return data
}

export const publishPost = async (token, id) => {
  const { data } = await api.put(
    `/posts/publish/${id}`,
    {},
    {
      headers: {
        "x-access-token": token,
      },
    }
  )
  return data
}

export const updatePost = async (token, id, body) => {
  const { data } = await api.put(`/posts/${id}`, body, {
    headers: {
      "x-access-token": token,
    },
  })
  return data
}

export const deleteUser = async (token, id) => {
  const { data } = await api.delete(`/posts/${id}`, {
    headers: {
      "x-access-token": token,
    },
  })
  return data
}

export const addToFavs = async (token, id) => {
  const { data } = await api.put(
    `/posts/favs/${id}`,
    {},
    {
      headers: {
        "x-access-token": token,
      },
    }
  )
  return data
}

export const removeFromFavs = async (token, id) => {
  const { data } = await api.delete(`/posts/favs/${id}`, {
    headers: {
      "x-access-token": token,
    },
  })
  return data
}
