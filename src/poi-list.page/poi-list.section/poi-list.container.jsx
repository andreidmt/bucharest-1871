// @flow

const debug = require("debug")("Bucharest1871:POIListContainer")

import * as React from "react"
import { connect } from "react-redux"

import { POIListView } from "./poi-list.view"
import { LayoutPOIList } from "../../layout/layout.state"

import type { LayoutPOIType } from "../../layout/layout.state"

type POIListContainerPropsType = {|
  pois: LayoutPOIType[],
  xHandlePOIFind: Function,
|}

class POIListContainer extends React.Component<POIListContainerPropsType> {
  /**
   * This function will be called only once in the whole life-cycle of a given
   * component and it being called signalizes that the component and all its
   * sub-components rendered properly.
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
    const { pois } = this.props

    return <POIListView pois={pois} />
  }
}

const connectedPOIListContainer = connect(
  (store): Object => {
    const poiSelector = LayoutPOIList.selector(store)

    return {
      pois: poiSelector.items(),
    }
  },
  (dispatch: Function): Object => ({
    xHandlePOIFind: LayoutPOIList.find(dispatch),
  })
)(POIListContainer)

export { connectedPOIListContainer as POIListContainer }
