// @flow

const debug = require("debug")("Bucharest1871:UIMarker")

import * as React from "react"
import cx from "classnames"

import css from "./marker.css"

type PropsType = {|
  label: string,
  left: number,
  top: number,
  isActive?: boolean,
  hasLabelVisible?: boolean,
  onClick?: Function,
|}

export const UIMarker = ({
  label,
  left,
  top,
  isActive = false,
  hasLabelVisible = false,
  onClick,
}: PropsType): React.Node => (
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
    {hasLabelVisible && <div className={css.label}>{label}</div>}
  </div>
)
