import api from "./api.service"

export const countAllUser = async () => {
  const { data } = await api.get("/users/count")
  return data.count
}

export const countAuthors = async () => {
  const { data } = await api.get("/users/authors/count")
  return data
}

export const countAdmins = async () => {
  const { data } = await api.get("/users/admins/count")
  return data
}

export const getAllUsers = async (page = 1, limit = 10) => {
  const { data } = await api.get(`/users/?page=${page}&limit=${limit}`)
  return data
}

export const getReaders = async (page = 1, limit = 10) => {
  const { data } = await api.get(`/users/readers?page=${page}&limit=${limit}`)
  return data
}

export const getAuthors = async (page = 1, limit = 10) => {
  const { data } = await api.get(`/users/authors?page=${page}&limit=${limit}`)
  return data
}

export const getAdmins = async (page = 1, limit = 10) => {
  const { data } = await api.get(`/users/admins?page=${page}&limit=${limit}`)
  return data
}

export const searchUser = async (username) => {
  const { data } = await api.get(`/users/search?username=${username}`)
  return data
}

export const getUserById = async (id) => {
  const { data } = await api.get(`/users/${id}`)
  return data
}

export const updateUser = async (token, id, body) => {
  const { data } = await api.put(`/users/${id}`, body, {
    headers: { "x-access-token": token },
  })
  return data
}

export const promoteUserToAuthor = async (token, id) => {
  const { data } = await api.put(
    `/users/author/${id}`,
    {},
    { headers: { "x-access-token": token } }
  )
  return data
}

export const promoteUserToAdmin = async (token, id) => {
  const { data } = await api.put(
    `/users/admin/${id}`,
    {},
    { headers: { "x-access-token": token } }
  )
  return data
}

export const deactivateUser = async (token, id) => {
  const { data } = await api.put(
    `/users/deactivate/${id}`,
    {},
    { headers: { "x-access-token": token } }
  )
  return data
}

export const activateUser = async (token, id) => {
  const { data } = await api.put(
    `/users/activate/${id}`,
    {},
    { headers: { "x-access-token": token } }
  )
  return data
}

export const deleteUser = async (token, id) => {
  const { data } = await api.delete(`/users/${id}`, {
    headers: { "x-access-token": token },
  })
  return data
}
