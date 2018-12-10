// @flow

const debug = require("debug")("Bucharest1871:UIErrorBoundary")

import * as React from "react"
import { isEmpty } from "@asd14/m"

type UIErrorBoundaryPropsType = {|
  message?: string,
  children: React.Node | React.Node[],
|}

type UIErrorBoundaryStateType = {|
  error?: Object,
|}

export class UIErrorBoundary extends React.Component<
  UIErrorBoundaryPropsType,
  UIErrorBoundaryStateType
> {
  static defaultProps = {
    message: "Uuuupsilon",
  }

  /**
   * Error boundaries are React components that catch JavaScript errors
   * anywhere in their child component tree, log those errors, and display a
   * fallback UI instead of the component tree that crashed. Error boundaries
   * catch errors during rendering, in lifecycle methods, and in constructors
   * of the whole tree below them.
   *
   * @param {Object}  error      The error
   * @param {Object}  errorInfo  Error info
   */
  componentDidCatch(error: Object /* , errorInfo: Object */) {
    this.setState({
      error,
    })

    //
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
    const { children } = this.props
    const { error } = this.state

    return isEmpty(error) ? children : "Something is wrong"
  }
}
