// @flow

const debug = require("debug")("Bucharest1871:POIListView")

import * as React from "react"
import { map } from "@asd14/m"

import css from "./poi-list.css"

import type { POIModelType } from "poi-list.page/poi-list.section/poi-list.state"

type POIListViewType = {|
  pois: POIModelType[],
|}

export const POIListView = React.memo<POIListViewType>(
  ({ pois }): React.Node => (
    <div className={css.items}>
      {map(
        (poi: POIModelType): React.Node => <div key={poi.id}>{poi.name}</div>
      )(pois)}
    </div>
  )
)
