import api from "./api.service"

export const signUp = async (data) => {
  return await api.post("/auth/sign-up", data)
}

export const signIn = async (data) => {
  return await api.post("/auth/sign-in", data)
}

export const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  window.location.reload()
}

export const me = async (token) => {
  const { data } = await api.get("/auth/me", {
    headers: { "x-access-token": token },
  })
  return data.user
}
