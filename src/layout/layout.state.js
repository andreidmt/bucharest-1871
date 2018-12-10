// @flow

const debug = require("debug")("Bucharest1871:DefaultLayoutState")

import cuid from "cuid"
import { buildList } from "@asd14/redux-all-is-list"

import { POST, PATCH, GET, DELETE } from "../core/api.helper"

/**
 * Point of Interest
 */

type LayoutPOIDataType = {
  name: string,
  latitude: number,
  longitude: number,
}

export type LayoutPOIType = {
  id: string,
} & LayoutPOIDataType

export const LayoutPOIList = buildList({
  name: "LAYOUT__POI-LIST",
  methods: {
    create: (data: LayoutPOIDataType): LayoutPOIType =>
      POST("/pois", {
        body: {
          id: cuid(),
          ...data,
        },
      }),

    find: (): LayoutPOIType[] => GET(`/pois`),

    update: (id: string, data: LayoutPOIDataType): LayoutPOIType =>
      PATCH(`/pois/${id}`, {
        body: data,
      }),

    delete: (id: string): LayoutPOIType => DELETE(`/pois/${id}`),
  },
})
