// @flow

const debug = require("debug")("Bucharest1871:APIHelper")

import contentType from "content-type"
import { stringify } from "qs"
import { pipe, has, trim, startsWith } from "@asd14/m"

import { RequestError } from "./request.error"

// List of http methods used for updating resources
const updateMethods = ["DELETE", "PATCH", "POST", "PUT"]

/**
 * Gets the token.
 *
 * @return {string|void}  The token.
 */
const getToken = (): ?string => null

/**
 * Determines if absolute url
 *
 * @param  {string}   input  The input
 *
 * @return {boolean}  True if absolute url, False otherwise
 */
const isURL = ((): Function => {
  const startsWithRegExp = /^https?:\/\//i

  return (source: string): boolean => startsWithRegExp.test(source)
})()

type RequestDataType = {
  body?: Object,
  headers?: Object,
  query?: Object,
}

type RequestOptionsType = {
  trailingSlash: boolean,
}

/**
 * Generic `fetch` wrapper with:
 *      - default headers
 *      - JWT token in `Authorization` header
 *      - base API url
 *
 * @param  {string}                    method              HTTP method
 * @param  {string}                    endpoint            API endpoint
 * @param  {Object}                    arg3                Req
 * @param  {Object<string,string|[]>}  arg3.query          Req query params
 * @param  {Object<string,string>}     arg3.headers        Req headers
 * @param  {Object<string,*>}          arg3.body           Req body
 * @param  {Object}                    arg4                Req options
 * @param  {boolean}                   arg4.trailingSlash  Weather to add a
 *                                                         trailing
 *
 * @return {Promise}                   Promise that resolves with the response
 *                                     object if code is 20*. Reject all other
 *                                     response codes.
 */
const request = async (
  method: string,
  endpoint: string,
  { body = {}, headers = {}, query }: RequestDataType = {},
  { trailingSlash = false }: RequestOptionsType = {}
): Promise<any> => {
  const API_URL = process.env.API_URL ?? ""
  const FULL_URL = pipe(
    trim("/"),
    (url: string): string => (isURL(url) ? url : `${API_URL}/${url}`),
    (url: string): string => (trailingSlash ? `${url}/` : url),
    (url: string): string =>
      query
        ? `${url}?${stringify(query, {
            allowDots: true,
            encode: false,
            arrayFormat: "brackets",
            strictNullHandling: true,
          })}`
        : url
  )(endpoint)

  // Check if requesting an outside service or internal API
  const isOutside = isURL(endpoint) && !startsWith(API_URL)(endpoint)

  /*
   * Req body for PATCH, POST and PUT requests. Ignore `body` key to avoid
   * "HEAD or GET Request cannot have a body"
   */
  const _body = has(method)(updateMethods) ? { body: JSON.stringify(body) } : {}
  const authToken = getToken()
  const response = await fetch(FULL_URL, {
    method,
    headers: {
      Accept: "application/json, text/html",
      "Content-Type": "application/json",
      ...headers,
      ...(authToken && !isOutside
        ? {
            Authorization: `JWT ${authToken}`,
          }
        : {}),
    },
    ..._body,
  })

  /*
   * The Promise returned from fetch() won't reject on HTTP error status
   * even if the response is an HTTP 404 or 500. Instead, it will resolve
   * normally, and it will only reject on network failure or if anything
   * prevented the request from completing.
   */
  if (response.ok) {
    const isJSON =
      response.headers.has("Content-Type") &&
      contentType.parse(response.headers.get("Content-Type")).type ===
        "application/json"

    return isJSON ? response.json() : response.text()
  }

  throw new RequestError(response.statusText, {
    status: response.status,
    body: await response.json(),
  })
}

/**
 * POST
 *
 * @param  {string}   url      API endpoint
 * @param  {Object}   data     Req body or Req body & headers
 * @param  {Object}   options  Req options
 *
 * @return {Promise}  Promise that resolves with the response object if code is
 *                    20*. Reject all other response codes.
 */
export const POST = <T>(
  url: string,
  data: RequestDataType,
  options?: RequestOptionsType
): Promise<T> =>
  request("POST", url, { body: data.body, headers: data.headers }, options)

/**
 * PATCH
 *
 * @param  {string}   url      API endpoint
 * @param  {Object}   data     Req body or Req body & headers
 * @param  {Object}   options  Req options
 *
 * @return {Promise}  Promise that resolves with the response object if code is
 *                    20*. Reject all other response codes.
 */
export const PATCH = <T>(
  url: string,
  data: RequestDataType,
  options?: RequestOptionsType
): Promise<T> =>
  request("PATCH", url, { body: data.body, headers: data.headers }, options)

/**
 * GET
 *
 * @param  {string}  url           API endpoint
 * @param  {Object}  data          Req data
 * @param  {Object}  options       Req options
 *
 * @return {Promise}               Promise that resolves with the response
 *                                 object if code is 20*. Reject all other
 *                                 response codes.
 */
export const GET = <T>(
  url: string,
  data?: RequestDataType = {},
  options?: RequestOptionsType
): Promise<T> =>
  request("GET", url, { query: data.query, headers: data.headers }, options)

/**
 * DELETE
 *
 * @param  {string}   url           API endpoint
 * @param  {Object}  data          Req data
 * @param  {Object}   options       Req options
 *
 * @return {Promise}  Promise that resolves with the response object if code is
 *                    20*. Reject all other response codes.
 */
export const DELETE = <T>(
  url: string,
  data?: { body?: Object, headers?: Object } = {},
  options?: RequestOptionsType
): Promise<T> =>
  request("DELETE", url, { body: data.body, headers: data.headers }, options)
