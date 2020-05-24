const BASE_URL = 'http://localhost:5000';

export const urlConstants = {
  LOGIN: BASE_URL + '/auth/sign_in',
  LOGOUT: BASE_URL + '/auth/sign_out',
  REGISTER: BASE_URL + '/auth',
}

export const getAllCalUrl = (user_id) => {
  return `${BASE_URL}/users/${user_id}/substring_calculations`
}

export const deleteCalUrl = (user_id, cal_id) => {
  return `${BASE_URL}/users/${user_id}/substring_calculations/${cal_id}`
}

export const createCalUrl = (user_id, params) => {
  return `${BASE_URL}/users/${user_id}/substring_calculations?${params}`
}
