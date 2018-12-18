// @flow

const debug = require("debug")("Bucharest1871:UIMarker")

import * as React from "react"
import cx from "classnames"

import css from "./marker.css"

type UIMarkerPropsType = {|
  label: string,
  left: number,
  top: number,
  isActive?: boolean,
  onClick: Function,
|}

export const UIMarker = React.memo<UIMarkerPropsType>(
  ({ label, left, top, isActive = false, onClick }): React.Node => (
    <div
      className={cx(css.marker, {
        [css["marker--is-active"]]: isActive,
      })}
      title={label}
      style={{
        left,
        top,
      }}
      onClick={onClick}>
      <div className={css.pointer} />
      <div className={css.shadow} />
    </div>
  )
)
