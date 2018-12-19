// @flow

const debug = require("debug")("Bucharest1871:POIListContainer")

import * as React from "react"
import { connect } from "react-redux"

import { POIListView } from "./poi-list.view"
import { LayoutPOIList } from "../../layout/layout.state"

import type { LayoutPOIType } from "../../layout/layout.state"

type PropsType = {|
  pois: LayoutPOIType[],
  isLoading: boolean,
  isLoaded: boolean,
  xHandlePOIFind: Function,
|}

class POIListContainer extends React.Component<PropsType> {
  /**
   * When called, it should examine this.props and this.state and return a
   * single React element. This element can be either a representation of a
   * native DOM component, such as <div />, or another composite component
   * that you've defined yourself.
   *
   * @return {Component}
   */
  render = (): React.Node => {
    const { pois, isLoading, isLoaded } = this.props

    return !isLoaded || isLoading ? (
      "Loading POIs data ..."
    ) : (
      <POIListView pois={pois} />
    )
  }
}

const hasConnect = connect(
  (store: Object): Object => {
    const poiSelector = LayoutPOIList.selector(store)

    return {
      pois: poiSelector.items(),
      isLoading: poiSelector.isLoading(),
      isLoaded: poiSelector.isLoaded(),
    }
  }
)(POIListContainer)

export { hasConnect as POIListContainer }
