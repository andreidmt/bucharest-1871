// @flow

const debug = require("debug")("Bucharest1871:POIItemContainer")

import * as React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { buildURL } from "../../core/router.helper"

import { POIItemView } from "./poi-item.view"
import { LayoutPOIList } from "../../layout/layout.state"
import type { LayoutPOIType } from "../../layout/layout.state"

type PropType = {|
  history: Object,
  id: string,
  name?: string,
  latitude?: number,
  longitude?: number,
  isUpdating?: boolean,
  isDeleting?: boolean,
  isLoaded: boolean,
  isLoading: boolean,
  xHandlePOIItemFind: Function,
  xHandlePOIItemUpdate: Function,
  xHandlePOIItemDelete: Function,
|}

class POIItemContainer extends React.Component<PropType> {
  static defaultProps = {
    name: null,
    latitude: null,
    longitude: null,
    isUpdating: false,
    isDeleting: false,
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
    const {
      id,
      name,
      latitude,
      longitude,
      isUpdating,
      isDeleting,
      isLoading,
      isLoaded,
    } = this.props

    return !isLoaded || isLoading ? (
      "Loading POI data ..."
    ) : (
      <POIItemView
        id={id}
        name={name}
        latitude={latitude}
        longitude={longitude}
        isUpdating={isUpdating}
        isDeleting={isDeleting}
        onSave={this.handleMarkerUpdate}
        onDelete={this.handleMarkerDelete}
      />
    )
  }

  /**
   * Send modified POI data to API
   *
   * @param  {string}  id         POI id
   * @param  {string}  name       POI name
   * @param  {number}  latitude   POI latitude
   * @param  {number}  longitude  POI longitude
   *
   * @return {undefined}
   */
  handleMarkerUpdate = (
    id: string,
    { name, latitude, longitude }: LayoutPOIType
  ) => {
    const { xHandlePOIItemUpdate } = this.props

    xHandlePOIItemUpdate(id, { name, latitude, longitude })
  }

  /**
   * Delete POI from API
   *
   * @param  {string}  id  POI id
   *
   * @return {undefined}
   */
  handleMarkerDelete = (id: string): Promise<LayoutPOIType> => {
    const { history, xHandlePOIItemDelete } = this.props

    return xHandlePOIItemDelete(id).then(
      (deletedItem: LayoutPOIType): LayoutPOIType => {
        history.push(buildURL("pois"))

        return deletedItem
      }
    )
  }
}

const mapStateToProps = (store: Object, props: PropType): Object => {
  const { id } = props
  const poiSelector = LayoutPOIList.selector(store)

  const { name, latitude, longitude } = poiSelector.isLoaded()
    ? poiSelector.byId(id) ?? {}
    : {}

  return {
    name,
    latitude,
    longitude,
    isUpdating: poiSelector.isUpdating(id),
    isDeleting: poiSelector.isDeleting(id),
    isLoading: poiSelector.isLoading(id),
    isLoaded: poiSelector.isLoaded(id),
  }
}

const mapDispatchToProps = (dispatch: Function): Object => ({
  xHandlePOIItemFind: LayoutPOIList.find(dispatch),
  xHandlePOIItemUpdate: LayoutPOIList.update(dispatch),
  xHandlePOIItemDelete: LayoutPOIList.delete(dispatch),
})

const hasRouterConnect = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(POIItemContainer)
)

export { hasRouterConnect as POIItemContainer }
