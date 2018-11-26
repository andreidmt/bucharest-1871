const debug = require("debug")("Leeruniek:APIService")

import contentType from "content-type"
import { stringify } from "qs"
import { is, has, trim } from "@asd14/m"

import RequestError from "core/request.error"

// List of http methods used for updating resources
const updateMethods = ["DELETE", "PATCH", "POST", "PUT"]

/**
 * Gets the token.
 *
 * @return {string|void}  The token.
 */
const getToken = () => undefined

/**
 * Determines if absolute url
 *
 * @param  {string}   input  The input
 *
 * @return {boolean}  True if absolute url, False otherwise
 */
const isURL = (() => {
  const startsWithRegExp = /^https?:\/\//i

  return input => startsWithRegExp.test(input)
})()

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
  method,
  endpoint,
  { query = null, headers = {}, body = {} } = {},
  { trailingSlash = false } = {}
) => {
  const fullURL =
    endpoint
    |> trim("/")
    |> (url => (isURL(url) ? url : `${process.env.API_URL}/${url}`))
    |> (url => (trailingSlash ? `${url}/` : url))
    |> (url =>
      is(query) === null
        ? url
        : `${url}?${stringify(query, {
            allowDots: true,
            encode: false,
            arrayFormat: "brackets",
            strictNullHandling: true,
          })}`)

  /*
   * Check if requesting an outside service or internal API
   * Deciding if it's an URN or a URL ... :))
   */
  const isOutside = isURL(endpoint) && !endpoint.startsWith(process.env.API_URL)

  /*
   * Req body for PATCH, POST and PUT requests. Ignore `body` key to avoid
   * "HEAD or GET Request cannot have a body"
   */
  const _body = has(method)(updateMethods) ? { body: JSON.stringify(body) } : {}
  const response = await fetch(fullURL, {
    method,
    headers: {
      Accept: "application/json, text/html",
      "Content-Type": "application/json",
      ...headers,
      ...(is(getToken()) && !isOutside
        ? {
            Authorization: `JWT ${getToken()}`,
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
export const POST = async (url, { body, headers, query } = {}, options) =>
  request(
    "POST",
    url,
    {
      body,
      headers,
      query,
    },
    options
  )

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
export const PATCH = async (url, { body, headers } = {}, options) =>
  request(
    "PATCH",
    url,
    {
      body,
      headers,
    },
    options
  )

/**
 * GET
 *
 * @param  {string}  url           API endpoint
 * @param  {Object}  arg2          Req
 * @param  {Object}  arg2.query    Req query params
 * @param  {Object}  arg2.headers  Req headers
 * @param  {Object}  options       Req options
 *
 * @return {Promise}               Promise that resolves with the response
 *                                 object if code is 20*. Reject all other
 *                                 response codes.
 */
export const GET = async (url, { query, headers } = {}, options) =>
  request(
    "GET",
    url,
    {
      query,
      headers,
    },
    options
  )

/**
 * DELETE
 *
 * @param  {string}   url           API endpoint
 * @param  {Object}   arg2          Req
 * @param  {Object}   arg2.body     Req body
 * @param  {Object}   arg2.headers  Req headers
 * @param  {Object}   options       Req options
 *
 * @return {Promise}  Promise that resolves with the response object if code is
 *                    20*. Reject all other response codes.
 */
export const DELETE = async (url, { body, headers } = {}, options) =>
  request("DELETE", url, { body, headers }, options)
