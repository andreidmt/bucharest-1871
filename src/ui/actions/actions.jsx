// @flow

const debug = require("debug")("Bucharest1871:UIActions")

import * as React from "react"

import css from "./actions.css"

type PropsType = {|
  children: React.Node,
|}

export const UIActions = React.memo<PropsType>(
  ({ children }): React.Node => (
    <div className={css.actions}>
      <hr />
      {children}
    </div>
  )
)
