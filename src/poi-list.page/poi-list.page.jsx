// @flow

const debug = require("debug")("Bucharest1871:POIListPage")

import * as React from "react"

import { POIListContainer } from "./poi-list.section/poi-list.container"

class POIListPage extends React.Component<{}> {
  /**
   * When called, it should examine this.props and this.state and return a
   * single React element. This element can be either a representation of a
   * native DOM component, such as <div />, or another composite component
   * that you've defined yourself.
   *
   * @return {Component}
   */
  render = (): React.Node => <POIListContainer />
}

export { POIListPage }
