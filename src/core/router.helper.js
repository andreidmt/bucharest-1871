// @flow

const debug = require("debug")("Bucharest1871:RouterHelper")

import pathToRegexp from "path-to-regexp"
import { reduce, isEmpty } from "@asd14/m"
import { stringify } from "qs"

import { RouteNotFoundError } from "./route-not-found.error"

const ROUTES = {
  pois: "/pois",
  "pois:item": "/pois/:id",
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
 * Get the url parameters
 *
 * @param  {string}   url        The url
 * @param  {string}   routeName  The route name
 * @param  {Object}   arg3       Props
 * @param  {boolean}  arg3.end   The end
 *
 * @return {Object}   Key/Value parameter object
 */
export const getParams = (
  url: string,
  routeName: string,
  { end = false }: Object = {}
): Object => {
  const keys = []
  const regExp = pathToRegexp(ROUTES[routeName], keys, { end })
  const match = regExp.exec(url)

  return match && match.length >= 2
    ? reduce(
        (acc, key, index: number): Object => ({
          ...acc,
          [key.name]: match[index + 1],
        }),
        {}
      )(keys)
    : {}
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
  params?: Object,
  query?: Object
): string => {
  if (isEmpty(ROUTES[name])) {
    throw new RouteNotFoundError(name)
  }

  return query
    ? `${compiledRoutes[name](params)}?${stringify(query)}`
    : compiledRoutes[name](params)
}
