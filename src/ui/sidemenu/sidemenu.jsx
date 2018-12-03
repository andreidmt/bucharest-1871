// @flow

const debug = require("debug")("Bucharest1871:UISidemenu")

import * as React from "react"
import cx from "classnames"
import { NavLink } from "react-router-dom"
import { map } from "@asd14/m"

import css from "./sidemenu.css"

type SidemenuItemType = {|
  label: string,
  icon: string,
  url: string,
|}

type SidemenuPropsType = {|
  items: SidemenuItemType[],
|}

export const Sidemenu = React.memo<SidemenuPropsType>(
  ({ items }): React.Node => (
    <div className={css.menu}>
      {map(
        ({ label, icon, url }: SidemenuItemType, index): React.Node => (
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
