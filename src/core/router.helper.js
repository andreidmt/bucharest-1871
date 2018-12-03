// @flow

const debug = require("debug")("Bucharest1871:RouterHelper")

import pathToRegexp from "path-to-regexp"
import { reduce, isEmpty } from "@asd14/m"
import { stringify } from "qs"

import { RouteNotFoundError } from "./route-not-found.error"

const ROUTES = {
  poi: "/pois",
  "poi:item": "/pois/:id",
  poi_types: "/poi-types",
}

/**
 * Pass all available routes through pathToRegexp lib (the same lib that
 * React Router 4 uses to build the routes internally)
 *
 * @type {Object<string, Object>}
 */
const compiledRoutes = reduce(
  (acc: {}, [key, value]): {} => ({
    ...acc,
    [key]: pathToRegexp.compile(value),
  }),
  {}
)(Object.entries(ROUTES))

/**
 * Get route path by name
 *
 * @param  {string}  name  Route name
 *
 * @throws {RouteNotFoundError}  If route name not defined
 *
 * @return {string}
 */
export const getPath = (name: string): string => {
  if (isEmpty(ROUTES[name])) {
    throw new RouteNotFoundError(name)
  }

  return ROUTES[name]
}

/**
 * Build the URL based on route name, route params and query param
 *
 * @param  {String}  name    Route name
 * @param  {Object}  params  Route parameters
 * @param  {Object}  query   Query parameters
 *
 * @throws {RouteNotFoundError}  If route name not defined
 *
 * @return {String}
 */
export const buildURL = (
  name: string,
  params: {} = {},
  query: {} = {}
): string => {
  if (isEmpty(ROUTES[name])) {
    throw new RouteNotFoundError(name)
  }

  return isEmpty(query)
    ? compiledRoutes[name](params)
    : `${compiledRoutes[name](params)}?${stringify(query)}`
}
