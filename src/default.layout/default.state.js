// @flow

const debug = require("debug")("Bucharest1871:DefaultLayoutState")

import { buildList } from "@asd14/redux-all-is-list"

import { GET } from "../core/api.helper"

export type POIModelType = {|
  id: string,
  name: string,
|}

/**
 * Point of Interest
 *
 * @type {Function}
 */
export const DefautLayoutPOIList = buildList({
  name: "DEFAULT-LAYOUT__POI-LIST",
  methods: {
    find: (): POIModelType[] => GET("/pois"),
  },
})
