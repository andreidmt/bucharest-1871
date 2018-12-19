// @flow

const debug = require("debug")("Bucharest1871:UIButton")

import * as React from "react"
import cx from "classnames"

import css from "./button.css"

type PropsType = {|
  className?: string,
  label?: string,
  icon?: string,
  type?: "primary" | "danger" | "default",
  isDisabled?: boolean,
  onClick?: Function,
|}

export const UIButton = React.memo<PropsType>(
  ({
    className = "",
    label,
    icon,
    type = "default",
    isDisabled = false,
    onClick,
  }): React.Node => (
    <div
      className={cx(className, css.button, css[`button--type-${type}`], {
        [css["button--is-disabled"]]: isDisabled,
      })}
      onMouseDown={isDisabled ? null : onClick}>
      {icon ? <i className={cx(css["button-icon"], "fas", icon)} /> : null}
      {label ? <span className={css["button-label"]}>{label}</span> : null}
    </div>
  )
)
