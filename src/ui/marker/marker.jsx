// @flow

const debug = require("debug")("Bucharest1871:UIMarker")

import * as React from "react"

import css from "./marker.css"

type MarkerPropsType = {|
  label: string,
  left: number,
  top: number,
|}

export const Marker = React.memo<MarkerPropsType>(
  ({ label, left, top }): React.Node => (
    <div
      className={css.marker}
      title={label}
      // eslint-disable-next-line
      style={{
        left,
        top,
      }}>
      <i className="fas fa-2x fa-map-marker" />
    </div>
  )
)
