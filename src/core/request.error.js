/**
 * Custom error for API requests
 *
 * @class RequestError
 */
export default class RequestError extends Error {
  constructor(message, { status, body }) {
    super(`${status}:${message}`)

    this.name = "RequestError"
    this.code = status
    this.body = body

    this._isAccessError = status === 401 || status === 403
    this._isAppError = !this._isAccessError
  }
}
