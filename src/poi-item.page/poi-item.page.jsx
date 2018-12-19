// @flow

const debug = require("debug")("Bucharest1871:POIItemPage")

import * as React from "react"
import { withRouter } from "react-router-dom"

import { POIItemContainer } from "./poi-item.section/poi-item.container"

type PropsType = {|
  match: {
    params: {
      id: string,
    },
  },
|}

class POIItemPage extends React.Component<PropsType> {
  /**
   * When called, it should examine this.props and this.state and return a
   * single React element. This element can be either a representation of a
   * native DOM component, such as <div />, or another composite component
   * that you've defined yourself.
   *
   * @return {Component}
   */
  render = (): React.Node => {
    const { match } = this.props

    return <POIItemContainer id={match.params.id} />
  }
}

const hasRouter = withRouter(POIItemPage)

export { hasRouter as POIItemPage }
