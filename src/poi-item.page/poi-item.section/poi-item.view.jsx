// @flow

const debug = require("debug")("Bucharest1871:POIItemView")

import * as React from "react"

import { UIInput } from "../../ui/input/input"
import { UIButton } from "../../ui/button/button"
import { UIActions } from "../../ui/actions/actions"

import css from "./poi-item.css"

type PropsType = {|
  id: string,
  name?: string,
  latitude?: number,
  longitude?: number,
  isUpdating?: boolean,
  isDeleting?: boolean,
  onSave: Function,
  onDelete: Function,
|}

type StateType = {
  hasDeleteConfirm?: boolean,
  fieldName?: string,
  fieldLatitude?: number,
  fieldLongitude?: number,
}

export class POIItemView extends React.PureComponent<PropsType, StateType> {
  static defaultProps = {
    name: undefined,
    latitude: undefined,
    longitude: undefined,
    isUpdating: false,
    isDeleting: false,
  }

  state = {
    hasDeleteConfirm: false,
    fieldName: this.props.name,
    fieldLatitude: this.props.latitude,
    fieldLongitude: this.props.longitude,
  }

  static getDerivedStateFromProps = (
    props: PropsType,
    state: StateType
  ): ?StateType => {
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
    const { id, isUpdating, isDeleting } = this.props
    const {
      fieldName,
      fieldLatitude,
      fieldLongitude,
      hasDeleteConfirm,
    } = this.state

    const isDisabled = isUpdating || isDeleting

    return (
      <div className={css.form}>
        <h1>Edit POI</h1>
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
        <UIActions>
          <UIButton
            icon={isUpdating ? "fa-spinner fa-spin" : "fa-save"}
            type="primary"
            isDisabled={isDisabled}
            onClick={this.handlePOIFormSave}
          />
          {hasDeleteConfirm ? (
            [
              <UIButton
                key={`forn-cancel-delete-${id}`}
                className={css["form-action--right"]}
                icon="fa-times"
                isDisabled={isDisabled}
                onClick={this.handlePOIFormDeleteCancel}
              />,
              <UIButton
                key={`forn-delete-${id}`}
                className={css["form-action--right"]}
                icon={isDeleting ? "fa-spinner fa-spin" : "fa-trash"}
                type="danger"
                isDisabled={isDisabled}
                onClick={this.handlePOIFormDelete}
              />,
            ]
          ) : (
            <UIButton
              className={css["form-action--right"]}
              icon={isDeleting ? "fa-spinner fa-spin" : "fa-trash"}
              type="danger"
              isDisabled={isDisabled}
              onClick={this.handlePOIFormDeleteConfirm}
            />
          )}
        </UIActions>
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
  handleNameChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    debug({
      asd: event.currentTarget.value,
      asd2: event.target.value,
    })
    this.setState({
      fieldName: event.currentTarget.value,
    })
  }

  /**
   * Bind latitude input to state.fieldLatitude
   *
   * @param  {Object}  event  Keyboard event
   *
   * @return {undefined}
   */
  handleLatitudeChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      fieldLatitude: parseInt(event.currentTarget.value, 10),
    })
  }

  /**
   * Bind longitude input to state.fieldLongitude
   *
   * @param  {Object}  event  Keyboard event
   *
   * @return {undefined}
   */
  handleLongitudeChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      fieldLongitude: parseInt(event.currentTarget.value, 10),
    })
  }

  /**
   * POI form submit
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

  /**
   * POI form delete confirm
   *
   * @return {undefined}
   */
  handlePOIFormDeleteConfirm = () => {
    this.setState({
      hasDeleteConfirm: true,
    })
  }

  /**
   * POI form delete cancel
   *
   * @return {undefined}
   */
  handlePOIFormDeleteCancel = () => {
    this.setState({
      hasDeleteConfirm: false,
    })
  }

  /**
   * POI form delete
   *
   * @return {undefined}
   */
  handlePOIFormDelete = () => {
    const { id, onDelete } = this.props
    const { hasDeleteConfirm } = this.state

    if (hasDeleteConfirm) {
      onDelete(id)
    }
  }
}
