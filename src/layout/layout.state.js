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
  name: string,
  latitude: number,
  longitude: number,
}

export const LayoutPOIList = buildList({
  name: "LAYOUT__POI-LIST",
  methods: {
    create: (data: LayoutPOIDataType): Promise<LayoutPOIType> =>
      POST("/pois", {
        body: {
          id: cuid(),
          ...data,
        },
      }),

    find: (): Promise<LayoutPOIType[]> => GET(`/pois`),

    update: (id: string, data: LayoutPOIDataType): Promise<LayoutPOIType> =>
      PATCH(`/pois/${id}`, {
        body: data,
      }),

    delete: (id: string): Promise<LayoutPOIType> => DELETE(`/pois/${id}`),
  },
})

/**
 * User settings
 */

type LayoutSettingsDataType = {
  name: string,
  value: number | string | boolean,
}

export type LayoutSettingsType = {
  id: string,
  name: string,
  value: number | string | boolean,
}

export const LayoutSettingsList = buildList({
  name: "LAYOUT__SETTINGS",
  methods: {
    find: (): Promise<LayoutSettingsType[]> => GET(`/settings`),

    update: (
      id: string,
      data: LayoutSettingsDataType
    ): Promise<LayoutSettingsType> =>
      PATCH(`/settings/${id}`, {
        body: data,
      }),
  },
})
