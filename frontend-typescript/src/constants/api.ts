const URI_USER_SVC = 'http://localhost:8000'

const API_VERSION = '/api/v1'
const SIGN_UP = '/signup'
const LOG_IN = '/login'
const LOG_OUT = '/logout'
const USERS = '/users'
const CHANGE_PASSWORD = '/change-password'

export const URL_SIGN_UP = URI_USER_SVC + API_VERSION + SIGN_UP
export const URL_LOG_IN = URI_USER_SVC + API_VERSION + LOG_IN
export const URL_LOG_OUT = URI_USER_SVC + API_VERSION + LOG_OUT
export const URL_CHANGE_PASSWORD =
  URI_USER_SVC + API_VERSION + USERS + CHANGE_PASSWORD
export const URL_DELETE_USER = URI_USER_SVC + API_VERSION + USERS
