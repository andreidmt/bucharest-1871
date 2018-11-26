// @flow

const debug = require("debug")("Bucharest1871:POIListView")

import * as React from "react"

import css from "./poi-list.css"

type POIListViewType = {|
  text: string,
|}

class POIListView extends React.PureComponent<POIListViewType> {
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

    return <div className={css.test}>{text}</div>
  }
}

export { POIListView }
