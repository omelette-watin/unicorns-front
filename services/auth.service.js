import api from "./api.service"

export const signUp = async (data) => {
  return await api.post("/auth/sign-up", data)
}

export const signIn = async (data) => {
  return await api.post("/auth/sign-in", data)
}

export const me = async (token) => {
  const { data: user } = await api.get("/auth/me", { headers: { "x-access-token": token } })
  return user
}