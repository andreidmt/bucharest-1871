// @flow

const debug = require("debug")("Bucharest1871:Layout")

import * as React from "react"
import cx from "classnames"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { map, findBy, pipe, when, is, get, countBy, isEmpty } from "@asd14/m"

import { buildURL, getParams } from "../core/router.helper"

import { LayoutPOIList, LayoutSettingsList } from "./layout.state"
import type { LayoutPOIType } from "./layout.state"

import { UIGrid } from "../ui/grid/grid"
import { UISidemenu } from "../ui/sidemenu/sidemenu"
import { UIDataStatus } from "../ui/data-status/data-status"

import css from "./layout.css"
import mapImage from "./images/map.jpg"

type LayoutPropsType = {|
  history: Object,
  location: {
    pathname: string,
  },
  pois: LayoutPOIType[],
  poisSelectedId?: string,
  settingGridShowLabel: boolean,
  stateStatus: {
    isLoading: boolean,
    isCreating: boolean,
    isUpdating: boolean,
    isDeleting: boolean,
  }[],
  children: React.Node | React.Node[],
  xHandlePOICreate: Function,
  xHandlePOIFind: Function,
  xHandleSettingsFind: Function,
|}

class Layout extends React.Component<LayoutPropsType> {
  static defaultProps = {
    poisSelectedId: undefined,
  }

  /**
   * Called only once in the whole life-cycle of a given component and it
   * being called signalizes that the component and all its sub-components
   * rendered properly.
   *
   * DO
   *  - cause side effects (AJAX calls etc.)
   *
   * DON'T
   *  - call this.setState as it will result in a re-render
   */
  componentDidMount = () => {
    const { xHandlePOIFind, xHandleSettingsFind } = this.props

    xHandlePOIFind()
    xHandleSettingsFind()
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
      pois,
      poisSelectedId,
      children,
      settingGridShowLabel,
      stateStatus,
    } = this.props

    return (
      <div className={css["layout--default"]}>
        <UIDataStatus
          className={css.hud}
          createCount={countBy({ isCreating: true })(stateStatus)}
          loadCount={countBy({ isLoading: true })(stateStatus)}
          updateCount={countBy({ isUpdating: true })(stateStatus)}
          deleteCount={countBy({ isDeleting: true })(stateStatus)}
        />
        <UIGrid
          className={css.under}
          markers={map(
            ({ id, name, latitude, longitude }): {} => ({
              id,
              label: name,
              left: latitude,
              top: longitude,
            })
          )(pois)}
          markersSelectedId={poisSelectedId}
          mapURL={mapImage}
          width={6464}
          height={4767}
          hasLabels={settingGridShowLabel}
          onMarkerClick={this.handleMarkerClick}
          onMapClick={this.handleMapClick}
        />
        <UISidemenu
          className={css.hud}
          items={[
            { label: "Main page", icon: "globe", url: "/" },
            {
              label: "Points of Interest",
              icon: "map-marked",
              url: buildURL("pois"),
            },
          ]}
        />
        <div className={cx(css.content, css.hud)}>{children}</div>
      </div>
    )
  }

  /**
   * On marker click, go to Edit POI Page
   *
   * @param {string} poiId POI id
   *
   * @returns {undefined}
   */
  handleMarkerClick = (poiId: string) => {
    const { history } = this.props

    history.push(buildURL("pois:item", { id: poiId }))
  }

  /**
   * On grid click, add a POI if CTRL key is pressed
   *
   * @param  {Object}  arg1            Grid data
   * @param  {number}  arg1.latitude   X mouse position
   * @param  {number}  arg1.longitude  Y mouse position
   * @param  {Object}  event           DOM mouse event
   *
   * @return {undefined}
   */
  handleMapClick = (
    { latitude, longitude },
    event: SyntheticMouseEvent<HTMLDivElement>
  ) => {
    const { xHandlePOICreate } = this.props

    if (event.ctrlKey === true) {
      xHandlePOICreate({ latitude, longitude, name: "" }).then(
        (createdItem: LayoutPOIType) => {
          const { history } = this.props

          history.push(buildURL("pois:item", { id: createdItem.id }))
        }
      )
    }
  }
}

const mapStateToProps = (store: Object, props: Object): Object => {
  const poiSelector = LayoutPOIList.selector(store)
  const settingsSelector = LayoutSettingsList.selector(store)
  const pageParams = getParams(props.location.pathname, "pois:item")

  return {
    pois: poiSelector.items(),
    poisSelectedId: pageParams.id,
    settingGridShowLabel: pipe(
      findBy({ name: "grid__show-label" }),
      when(is, get("value"), (): boolean => false)
    )(settingsSelector.items()),
    stateStatus: map(
      (listName: string): Object => {
        const slice = store[listName]

        return {
          isLoading: slice.isLoading,
          isCreating: slice.isCreating,
          isUpdating: !isEmpty(slice.itemsUpdating),
          isDeleting: !isEmpty(slice.itemsDeletingIds),
        }
      }
    )(Object.keys(store)),
  }
}

const mapDispatchToProps = (dispatch: Function): Object => ({
  xHandleSettingsFind: LayoutSettingsList.find(dispatch),
  xHandlePOICreate: LayoutPOIList.create(dispatch),
  xHandlePOIFind: LayoutPOIList.find(dispatch),
})

const hasRouterConnect = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Layout)
)

export { hasRouterConnect as Layout }
