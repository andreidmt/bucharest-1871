// @flow

const debug = require("debug")("Bucharest1871:POIListState")

import cuid from "cuid"
import { buildList } from "@asd14/redux-all-is-list"

import { GET, POST, PATCH, DELETE } from "../../core/api.helper"

/**
 * Types
 */
type POICreateType = {|
  name: string,
|}

type POIUpdateType = {|
  name: string,
|}

export type POIModelType = {|
  id: string,
  name: string,
|}

/**
 * Point of Interest
 *
 * @type {Function}
 */
export const POIList = buildList({
  name: "POI-LIST-PAGE__POI-LIST",
  methods: {
    create: ({ name }: POICreateType): POIModelType =>
      POST("/pois", {
        body: {
          id: cuid(),
          name,
        },
      }),

    find: (): POIModelType[] => GET("/pois"),

    update: (id: string, { name }: POIUpdateType): POIModelType =>
      PATCH(`/pois/${id}`, {
        body: {
          name,
        },
      }),

    delete: (id: string): POIModelType => DELETE(`/pois/${id}`),
  },
})
