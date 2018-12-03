const debug = require("debug")("Bucharest1871:Index")

import React from "react"
import { render } from "react-dom"
import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { routerReducer } from "react-router-redux"

import { getPath } from "./core/router.helper"
import { DefaultLayout } from "./default.layout/default.layout"

import { HomePage } from "./home.page/home.page"

import { POIListPage } from "./poi-list.page/poi-list.page"

import { POIList } from "./poi-list.page/poi-list.section/poi-list.state"
import { DefautLayoutPOIList } from "./default.layout/default.state"

import { POIItemPage } from "./poi-item.page/poi-item.page"

import "./index.css"

const store = createStore(
  combineReducers({
    [DefautLayoutPOIList.name]: DefautLayoutPOIList.reducer,
    [POIList.name]: POIList.reducer,
    router: routerReducer,
  })
)

render(
  <Provider store={store}>
    <BrowserRouter>
      <DefaultLayout>
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={true} path={getPath("poi")} component={POIListPage} />
          <Route path={getPath("poi:item")} component={POIItemPage} />
        </Switch>
      </DefaultLayout>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
