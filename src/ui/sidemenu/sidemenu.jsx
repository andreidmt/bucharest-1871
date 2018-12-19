// @flow

const debug = require("debug")("Bucharest1871:UISidemenu")

import * as React from "react"
import cx from "classnames"
import { NavLink } from "react-router-dom"
import { map } from "@asd14/m"

import css from "./sidemenu.css"

type UISidemenuItemType = {|
  label: string,
  icon: string,
  url: string,
|}

type PropsType = {|
  className?: string,
  items: UISidemenuItemType[],
|}

export const UISidemenu = React.memo<PropsType>(
  ({ className = "", items }): React.Node => (
    <div className={cx(css.menu, className)}>
      {map(
        ({ label, icon, url }: UISidemenuItemType, index): React.Node => (
          <NavLink
            key={`sidemenu-link-${index}`}
            className={cx(css.link)}
            activeClassName={css["link--is-active"]}
            exact={true}
            title={label}
            to={url}>
            <i className={`fas fa-${icon}`} />
          </NavLink>
        )
      )(items)}
    </div>
  )
)
