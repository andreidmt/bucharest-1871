// @flow

const debug = require("debug")("Bucharest1871:UIButton")

import * as React from "react"
import cx from "classnames"

import css from "./button.css"

type UIButtonType = {|
  label?: string,
  icon?: string,
  isDisabled?: boolean,
  onClick?: Function,
|}

export const UIButton = React.memo<UIButtonType>(
  ({ label, icon, isDisabled = false, onClick }): React.Node => (
    <div
      className={cx(css.button, {
        [css["button--is-disabled"]]: isDisabled,
      })}
      onMouseDown={isDisabled ? null : onClick}>
      {icon ? <i className={cx(css["button-icon"], "fas", icon)} /> : null}
      {label ? <span className={css["button-label"]}>{label}</span> : null}
    </div>
  )
)
