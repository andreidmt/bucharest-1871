/**
 * Custom error for router-utils url building
 *
 * @class RouteNotFoundError
 */
export class RouteNotFoundError extends Error {
  constructor(name) {
    super(`Route Not Found: Cound not find route with name "${name}"`)
    this.name = "RouteNotFoundError"
  }
}
