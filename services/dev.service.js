import api from "./api.service"

export const createDevReport = async (body) => {
  const { data } = await api.post("/dev/reports", body)
  return data
}

export const getDevReports = async () => {
  const { data } = await api.get("/dev/reports")
  return data
}
