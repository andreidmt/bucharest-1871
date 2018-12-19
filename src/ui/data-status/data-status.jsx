// @flow

const debug = require("debug")("Bucharest1871:UIDataStatus")

import * as React from "react"
import cx from "classnames"
import { repeat, map } from "@asd14/m"

import css from "./data-status.css"

type PropsType = {|
  className?: string,
  createCount: number,
  loadCount: number,
  updateCount: number,
  deleteCount: number,
|}

export const UIDataStatus = React.memo<PropsType>(
  ({
    className = "",
    createCount,
    loadCount,
    updateCount,
    deleteCount,
  }): React.Node =>
    (createCount | loadCount | updateCount | deleteCount) === 0 ? null : (
      <div className={cx(className, css["data-status"])}>
        Interacting with server ...
        <div className={css.calls}>
          {map(
            ({ type, count }): React.Node =>
              repeat(
                (index: number): React.Node => (
                  <div
                    key={`call-${type}-${index}`}
                    className={cx(css.call, css[`call--${type}`])}
                  />
                )
              )(count)
          )([
            {
              type: "create",
              count: createCount,
            },
            {
              type: "load",
              count: loadCount,
            },
            {
              type: "update",
              count: updateCount,
            },
            {
              type: "delete",
              count: deleteCount,
            },
          ])}
        </div>
      </div>
    )
)
