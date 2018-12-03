// @flow

const debug = require("debug")("Bucharest1871:DefaultLayout")

import * as React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { listSelector } from "@asd14/redux-all-is-list"
import { map } from "@asd14/m"

import { buildURL } from "../core/router.helper"

import { DefautLayoutPOIList } from "./default.state"
import type { POIModelType } from "./default.state"

import { Grid } from "../ui/grid/grid"
import { Sidemenu } from "../ui/sidemenu/sidemenu"

import css from "./default.css"
import mapImage from "./images/map.jpg"

type DefaultLayoutPropsType = {|
  pois: POIModelType[],
  children: React.Node | React.Node[],
  xHandlePOIFind: Function,
|}

@withRouter
@connect(
  (store): Object => {
    const poiSelector = listSelector(store[DefautLayoutPOIList.name])

    return {
      pois: poiSelector.items(),
    }
  },
  (dispatch: Function): Object => ({
    xHandlePOIFind: DefautLayoutPOIList.find(dispatch),
  })
)
class DefaultLayout extends React.Component<DefaultLayoutPropsType> {
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
        <Grid
          markers={map(
            ({ name, latitude, longitude }): {} => ({
              label: name,
              left: latitude,
              top: longitude,
            })
          )(pois)}
          mapURL={mapImage}
          width={6464}
          height={4767}
        />
        <Sidemenu
          items={[
            { label: "Main page", icon: "globe", url: "/" },
            {
              label: "Points of Interest",
              icon: "map-marked",
              url: buildURL("poi"),
            },
          ]}
        />
        <div className={css.content}>{children}</div>
      </div>
    )
  }
}

export { DefaultLayout }
