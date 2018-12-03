// @flow

const debug = require("debug")("Bucharest:1871:UIDebug")

import * as React from "react"
import { map } from "@asd14/m"

import css from "./debug.css"

type DebugPropsType = {|
  dump: {},
|}

export const Debug = ({ dump }: DebugPropsType): React.Node => (
  <div className={css.debug}>
    {map(
      ([key, value]: [string, mixed]): React.Node => (
        <div key={key}>
          <span className={css["debug-value"]}>{JSON.stringify(value)}</span>
          <span className={css["debug-label"]}>{key}</span>
        </div>
      )
    )(Object.entries(dump))}
  </div>
)
