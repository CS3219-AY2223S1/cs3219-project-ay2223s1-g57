//////////////////////////
// USER SERVICE
//////////////////////////
const URI_USER_SVC = 'http://localhost:8000'

const USER_API_VERSION = '/api/v1'
const SIGN_UP = '/signup'
const LOG_IN = '/login'
const LOG_OUT = '/logout'
const USERS = '/users'
const CHANGE_PASSWORD = '/change-password'

export const URL_SIGN_UP = URI_USER_SVC + USER_API_VERSION + SIGN_UP
export const URL_LOG_IN = URI_USER_SVC + USER_API_VERSION + LOG_IN
export const URL_LOG_OUT = URI_USER_SVC + USER_API_VERSION + LOG_OUT
export const URL_CHANGE_PASSWORD =
  URI_USER_SVC + USER_API_VERSION + USERS + CHANGE_PASSWORD
export const URL_DELETE_USER = URI_USER_SVC + USER_API_VERSION + USERS

//////////////////////////
// QUESTION SERVICE
//////////////////////////
const URI_QN_SVC = 'http://localhost:8002'

const QN_API_VERSION = '/api/v1'
const QUESTIONS = '/questions'
const DIFFICULTY = '/difficulty'

export const URL_GET_QN = URI_QN_SVC + QN_API_VERSION + QUESTIONS + DIFFICULTY

//////////////////////////
// MATCHING SERVICE
//////////////////////////
export const URI_MATCHING_SVC = 'http://localhost:8001'

//////////////////////////
// CHAT SERVICE
//////////////////////////
export const URI_CHAT_SVC = 'http://localhost:8003'
