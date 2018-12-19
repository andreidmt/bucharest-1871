// @flow

const debug = require("debug")("Bucharest1871:SettingsContainer")

import * as React from "react"
import { connect } from "react-redux"

import { LayoutSettingsList } from "../../layout/layout.state"
import type { LayoutSettingsType } from "../../layout/layout.state"

import { SettingsView } from "./settings.view"

type PropsType = {|
  settings: LayoutSettingsType[],
  isLoading: boolean,
  isLoaded: boolean,
  xHandleSettingsFind: Function,
  xHandleSettingsUpdate: Function,
|}

@connect(
  (store: Object): Object => {
    const settingsSelector = LayoutSettingsList.selector(store)

    return {
      settings: settingsSelector.items(),
      isLoading: settingsSelector.isLoading(),
      isLoaded: settingsSelector.isLoaded(),
    }
  },
  (dispatch: Function): Object => ({
    xHandleSettingsUpdate: LayoutSettingsList.update(dispatch),
  })
)
class SettingsContainer extends React.Component<PropsType> {
  /**
   * When called, it should examine this.props and this.state and return a
   * single React element. This element can be either a representation of a
   * native DOM component, such as <div />, or another composite component
   * that you've defined yourself.
   *
   * @return {Component}
   */
  render = (): React.Node => {
    const { settings, isLoading, isLoaded } = this.props

    return !isLoaded || isLoading ? (
      "Loading Settings data ..."
    ) : (
      <SettingsView settings={settings} onChange={this.handleChange} />
    )
  }

  /**
   * { item_description }
   *
   * @param {string}  id  Setting id
   *
   * @returns {undefined}
   */
  handleChange = (id: string): Function => (
    event: SyntheticInputEvent<HTMLInputElement>
  ) => {
    const { xHandleSettingsUpdate } = this.props

    xHandleSettingsUpdate(id, { value: event.currentTarget.checked })
  }
}

export { SettingsContainer }
