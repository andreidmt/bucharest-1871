// @flow

const debug = require("debug")("Bucharest1871:POIItemView")

import * as React from "react"

import { UIInput } from "../../ui/input/input"
import { UIButton } from "../../ui/button/button"

import css from "./poi-item.css"

type POIItemViewPropsType = {|
  id: string,
  name?: string,
  latitude?: number,
  longitude?: number,
  isUpdating?: boolean,
  onSave: Function,
|}

type POIItemViewStateType = {
  fieldName?: string,
  fieldLatitude?: number,
  fieldLongitude?: number,
}

export class POIItemView extends React.PureComponent<
  POIItemViewPropsType,
  POIItemViewStateType
> {
  static defaultProps = {
    name: undefined,
    latitude: undefined,
    longitude: undefined,
    isUpdating: false,
  }

  state = {
    fieldName: this.props.name,
    fieldLatitude: this.props.latitude,
    fieldLongitude: this.props.longitude,
  }

  static getDerivedStateFromProps = (props, state) => {
    const { name, latitude, longitude } = props
    const { fieldName, fieldLatitude, fieldLongitude } = state

    if (
      name !== fieldName &&
      latitude !== fieldLatitude &&
      longitude !== fieldLongitude
    ) {
      return {
        fieldName: name,
        fieldLatitude: latitude,
        fieldLongitude: longitude,
      }
    }

    return null
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
    const { id, isUpdating } = this.props
    const { fieldName, fieldLatitude, fieldLongitude } = this.state

    return (
      <div className={css.form}>
        <UIInput label="ID" value={id} isDisabled={true} />
        <br />
        <UIInput
          label="Name"
          value={fieldName}
          onChange={this.handleNameChange}
        />
        <br />
        <UIInput
          label="Latitude"
          value={fieldLatitude}
          onChange={this.handleLatitudeChange}
        />
        <br />
        <UIInput
          label="Longitude"
          value={fieldLongitude}
          onChange={this.handleLongitudeChange}
        />
        <hr />
        <UIButton
          icon={isUpdating ? "fa-spinner fa-spin" : "fa-save"}
          isDisabled={isUpdating}
          onClick={this.handlePOIFormSave}
        />
      </div>
    )
  }

  /**
   * Bind name input to state.fieldName
   *
   * @param  {Object}  event  Keyboard event
   *
   * @return {undefined}
   */
  handleNameChange = (event: SyntheticInputEvent<HTMLDivElement>) => {
    this.setState({
      fieldName: event.target.value,
    })
  }

  /**
   * Bind latitude input to state.fieldLatitude
   *
   * @param  {Object}  event  Keyboard event
   *
   * @return {undefined}
   */
  handleLatitudeChange = (event: SyntheticInputEvent<HTMLDivElement>) => {
    this.setState({
      fieldLatitude: parseInt(event.target.value, 10),
    })
  }

  /**
   * Bind longitude input to state.fieldLongitude
   *
   * @param  {Object}  event  Keyboard event
   *
   * @return {undefined}
   */
  handleLongitudeChange = (event: SyntheticInputEvent<HTMLDivElement>) => {
    this.setState({
      fieldLongitude: parseInt(event.target.value, 10),
    })
  }

  /**
   * { function_description }
   *
   * @return {undefined}
   */
  handlePOIFormSave = () => {
    const { id, onSave } = this.props
    const { fieldName, fieldLatitude, fieldLongitude } = this.state

    onSave(id, {
      name: fieldName,
      latitude: fieldLatitude,
      longitude: fieldLongitude,
    })
  }
}
