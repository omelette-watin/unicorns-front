import api from "./api.service"

export const countPublishedPosts = async () => {
  const { data } = await api.get("/posts/count")
  return data.count
}

export const getAllPublishedPostsIds = async () => {
  const { data } = await api.get("/posts/ids")
  return data.ids
}

export const getAllPublishedPosts = async (page = 1, limit = 10) => {
  const { data } = await api.get(`/posts/?page=${page}&limit=${limit}`)
  return data
}

export const getPublishedPostById = async (id) => {
  const { data } = await api.get(`/posts/${id}`)
  return data
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
  page = 1,
  limit = 10
) => {
  const { data } = await api.get(
    `/posts/user/saved/${id}?page=${page}&limit=${limit}`,
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
