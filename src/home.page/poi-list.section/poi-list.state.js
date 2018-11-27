// @flow

const debug = require("debug")("Bucharest1871:POIListState")

import cuid from "cuid"
import { buildList } from "@asd14/redux-all-is-list"
import { GET, POST, PATCH, DELETE } from "../../core/api"

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
  name: "INDEX__POI",
  methods: {
    create: ({ name }: POICreateType): POIModelType =>
      POST("/pois", {
        body: {
          id: cuid(),
          name,
        },
      }),

    find: (): POIModelType[] => GET("/poi"),

    update: (id: string, { name }: POIUpdateType): POIModelType =>
      PATCH(`/poi/${id}`, {
        body: {
          name,
        },
      }),

    delete: (id: string): POIModelType => DELETE(`/poi/${id}`),
  },
})
