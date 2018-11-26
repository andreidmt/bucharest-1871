// @flow

const debug = require("debug")("Bucharest1871:POIListState")

import cuid from "cuid"
import { buildList } from "redux-all-is-list"
import { repeat } from "@asd14/m"

type POIModelType = {|
  id: string,
  name: string,
|}

type POICreateType = {|
  name: string,
|}

type POIUpdateType = {|
  name: string,
|}

export const POIList = buildList({
  name: "INDEX__POI",
  methods: {
    create: ({ name }: POICreateType): POIModelType => ({
      id: cuid(),
      name,
    }),

    find: (): POIModelType[] =>
      repeat(
        (index: number): POIModelType => ({
          id: cuid(),
          name: `thing ${index}`,
        })
      )(5),

    update: (id: string, { name }: POIUpdateType): POIModelType => ({
      id,
      name,
    }),

    delete: (id: string): POIModelType => ({
      id,
      name: "lorem",
    }),
  },
})
