import api from "./api.service"

export const countAllComments = async () => {
  const { data } = await api.get("/comments/count")
  return data.count
}

export const getAllCommentsIds = async () => {
  const { data } = await api.get("/comments/ids")
  return data.ids
}

export const getAllComments = async (page = 1, limit = 10) => {
  const { data } = await api.get(`/comments/?page=${page}&limit=${limit}`)
  return data
}

export const getCommentById = async (id) => {
  const { data } = await api.get(`/comments/${id}`)
  return data
}

export const getCommentsByUserId = async (id, page = 1, limit = 10) => {
  const { data } = await api.get(
    `/comments/user/${id}?page=${page}&limit=${limit}`
  )
  return data
}

export const getCommentsByPostId = async (id, page = 1, limit = 10) => {
  const { data } = await api.get(
    `/comments/post/${id}?page=${page}&limit=${limit}`
  )
  return data
}

export const createComment = async (token, body) => {
  const { data } = await api.post(`/comments/`, body, {
    headers: {
      "x-access-token": token,
    },
  })
  return data
}

export const updateComment = async (token, id, body) => {
  const { data } = await api.put(`/comments/${id}`, body, {
    headers: {
      "x-access-token": token,
    },
  })
  return data
}

export const deleteComment = async (token, id) => {
  const { data } = await api.delete(`/comments/${id}`, {
    headers: {
      "x-access-token": token,
    },
  })
  return data
}
