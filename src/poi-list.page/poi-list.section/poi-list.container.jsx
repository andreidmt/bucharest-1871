// @flow

const debug = require("debug")("Bucharest1871:POIList")

import * as React from "react"
import { connect } from "react-redux"
import { listSelector } from "@asd14/redux-all-is-list"

import { POIListView } from "./poi-list.view"
import { POIList } from "./poi-list.state"

import type { POIModelType } from "poi-list.page/poi-list.section/poi-list.state"

type POIListType = {|
  pois: POIModelType[],
  xHandlePOIFind: Function,
|}

@connect(
  (store): Object => {
    const poiSelector = listSelector(store[POIList.name])

    return {
      pois: poiSelector.items(),
    }
  },
  (dispatch: Function): Object => ({
    xHandlePOIFind: POIList.find(dispatch),
  })
)
class POIListContainer extends React.Component<POIListType> {
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

export { POIListContainer }
