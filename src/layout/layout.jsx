// @flow

const debug = require("debug")("Bucharest1871:Layout")

import * as React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { map } from "@asd14/m"

import { buildURL } from "../core/router.helper"

import { LayoutPOIList } from "./layout.state"
import type { LayoutPOIType } from "./layout.state"

import { UIGrid } from "../ui/grid/grid"
import { UISidemenu } from "../ui/sidemenu/sidemenu"

import css from "./layout.css"
import mapImage from "./images/map.jpg"

type LayoutPropsType = {|
  pois: LayoutPOIType[],
  children: React.Node | React.Node[],
  xHandlePOIFind: Function,
|}

class Layout extends React.Component<LayoutPropsType> {
  /**
   * Called only once in the whole life-cycle of a given component and it
   * being called signalizes that the component and all its sub-components
   * rendered properly.
   *
   * DO
   *  - cause side effects (AJAX calls etc.)
   *
   * DON'T
   *  - call this.setState as it will result in a re-render
   */
  componentDidMount = () => {
    const { xHandlePOIFind } = this.props

    xHandlePOIFind()
  }

  /**
   * When called, it should examine this.props and this.state and return a
   * single React element. This element can be either a representation of a
   * native DOM component, such as <div />, or another composite component
   * that you've defined yourself.
   *
   * @return {Component}
   */
  render = (): React.Node => {
    const { pois, children } = this.props

    return (
      <div className={css["layout--default"]}>
        <UIGrid
          markers={map(
            ({ id, name, latitude, longitude }): {} => ({
              id,
              label: name,
              left: latitude,
              top: longitude,
            })
          )(pois)}
          mapURL={mapImage}
          width={6464}
          height={4767}
        />
        <UISidemenu
          items={[
            { label: "Main page", icon: "globe", url: "/" },
            {
              label: "Points of Interest",
              icon: "map-marked",
              url: buildURL("pois"),
            },
          ]}
        />
        <div className={css.content}>{children}</div>
      </div>
    )
  }
}

const hasRouterConnect = withRouter(
  connect(
    (store): Object => {
      const poiSelector = LayoutPOIList.selector(store)

      return {
        pois: poiSelector.items(),
      }
    },
    (dispatch: Function): Object => ({
      xHandlePOIFind: LayoutPOIList.find(dispatch),
    })
  )(Layout)
)

export { hasRouterConnect as Layout }
