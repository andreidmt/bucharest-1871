/**
 * Custom error for API requests
 *
 * @class RequestError
 */
export class RequestError extends Error {
  constructor(message, { status }) {
    super(`${status}:${message}`)
    this.name = "RequestError"
  }
}
