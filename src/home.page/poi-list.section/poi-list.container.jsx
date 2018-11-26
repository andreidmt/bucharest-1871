// @flow

const debug = require("debug")("Bucharest1871:POIList")

import * as React from "react"
import { POIListView } from "./poi-list.view"

type POIListType = {|
  text: string,
|}

class POIList extends React.Component<POIListType> {
  /**
   * When called, it should examine this.props and this.state and return a
   * single React element. This element can be either a representation of a
   * native DOM component, such as <div />, or another composite component
   * that you've defined yourself.
   *
   * @return {Component}
   */
  render = (): React.Node => {
    const { text } = this.props

    return <POIListView text="asd2" />
  }
}

export { POIList }
