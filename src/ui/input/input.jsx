// @flow

const debug = require("debug")("Bucharest1871:UIInput")

import * as React from "react"
import cx from "classnames"

import css from "./input.css"

type UIInputType = {|
  value?: string | number,
  label?: string,
  isDisabled?: boolean,
  onChange?: Function,
|}

export const UIInput = React.memo<UIInputType>(
  ({ value, label, isDisabled = false, onChange }): React.Node => (
    <div
      className={cx(css.input, {
        [css["input--is-disabled"]]: isDisabled,
      })}>
      {label ? <span className={css["input-label"]}>{label}</span> : null}
      <input
        disabled={isDisabled}
        className={css["input-field"]}
        value={value}
        onChange={onChange}
      />
    </div>
  )
)
