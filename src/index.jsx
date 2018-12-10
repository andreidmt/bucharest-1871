const debug = require("debug")("Bucharest1871:Index")

import React from "react"
import { render } from "react-dom"
import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { routerReducer } from "react-router-redux"

import { getPath } from "./core/router.helper"
import { Layout } from "./layout/layout"

import { LayoutPOIList } from "./layout/layout.state"

import { HomePage } from "./home.page/home.page"
import { POIListPage } from "./poi-list.page/poi-list.page"
import { POIItemPage } from "./poi-item.page/poi-item.page"

import "./index.css"

const store = createStore(
  combineReducers({
    [LayoutPOIList.name]: LayoutPOIList.reducer,
    router: routerReducer,
  })
)

render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Switch>
          {/* eslint-disable react/jsx-max-depth */}
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={true} path={getPath("pois")} component={POIListPage} />
          <Route path={getPath("pois:item")} component={POIItemPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
