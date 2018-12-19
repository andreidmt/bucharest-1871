// @flow

const debug = require("debug")("Bucharest1871:UIInput")

import * as React from "react"
import cx from "classnames"

import css from "./input.css"

type PropsType = {|
  value?: string | number,
  label?: string,
  type?: "checkbox",
  isChecked?: boolean,
  isDisabled?: boolean,
  onChange?: Function,
|}

export const UIInput = React.memo<PropsType>(
  ({
    value,
    label,
    type = "text",
    isDisabled = false,
    isChecked = false,
    onChange,
  }): React.Node => (
    <div
      className={cx(css.input, css[`input--type-${type}`], {
        [css["input--is-disabled"]]: isDisabled,
      })}>
      {type === "text" && label && (
        <span className={css["input-label"]}>{label}</span>
      )}

      {type === "text" && (
        <input
          className={css["input-field"]}
          type={type}
          value={value}
          disabled={isDisabled}
          onChange={onChange}
        />
      )}

      {type === "checkbox" && (
        <label className={css["input-label"]}>
          <input
            className={css["input-field"]}
            type={type}
            value={value}
            disabled={isDisabled}
            checked={isChecked}
            onChange={onChange}
          />
          {label}
        </label>
      )}
    </div>
  )
)
