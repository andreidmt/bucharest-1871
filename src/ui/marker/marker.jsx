// @flow

const debug = require("debug")("Bucharest1871:UIMarker")

import * as React from "react"
import cx from "classnames"

import css from "./marker.css"

type UIMarkerPropsType = {|
  id: string,
  label: string,
  left: number,
  top: number,
  isActive?: boolean,
  onClick: Function,
|}

export const UIMarker = React.memo<UIMarkerPropsType>(
  ({ id, label, left, top, isActive = false, onClick }): React.Node => [
    <div
      key={`marker-${id}`}
      className={cx(css.marker)}
      title={label}
      style={{
        left,
        top,
      }}
      onClick={onClick}
    />,
    <div
      key={`shadow-${id}`}
      className={cx(css.shadow, {
        [css["shadow--is-active"]]: isActive,
      })}
      style={{
        left,
        top,
      }}
    />,
  ]
)
