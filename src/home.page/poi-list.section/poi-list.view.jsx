// @flow

const debug = require("debug")("Bucharest1871:POIListView")

import * as React from "react"
import { map } from "@asd14/m"

import css from "./poi-list.css"

import type { POIModelType } from "home.page/poi-list.section/poi-list.state"

type POIListViewType = {|
  pois: POIModelType[],
|}

export const POIListView = React.memo(
  ({ pois }: POIListViewType): React.Node => (
    <div className={css.items}>
      {pois
        |> map(
          (poi: POIModelType): React.Node => <div key={poi.id}>{poi.name}</div>
        )}
    </div>
  )
)
