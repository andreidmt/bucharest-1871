// @flow

const debug = require("debug")("Bucharest1871:POIListView")

import * as React from "react"
import { map, isEmpty } from "@asd14/m"
import { Link } from "react-router-dom"

import { buildURL } from "../../core/router.helper"

import type { LayoutPOIType } from "../../layout/layout.state"

import css from "./poi-list.css"

type PropsType = {|
  pois: LayoutPOIType[],
|}

export const POIListView = React.memo<PropsType>(
  ({ pois }): React.Node => (
    <div className={css.items}>
      <h1>POIs</h1>
      {map(
        (poi: LayoutPOIType): React.Node => (
          <div className={css.item} key={poi.id}>
            {isEmpty(poi.name) ? <em>No name</em> : poi.name}

            <Link
              to={buildURL("pois:item", { id: poi.id })}
              className={css["edit-link"]}>
              edit
            </Link>
          </div>
        )
      )(pois)}
    </div>
  )
)
