const debug = require("debug")("Bucharest1871:Index")

import React from "react"
import { render } from "react-dom"
import { createStore, combineReducers, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { BrowserRouter, Route } from "react-router-dom"
import { routerReducer, routerMiddleware } from "react-router-redux"

import { HomePage } from "./home.page/home.page"
import { POIList } from "./home.page/poi-list.section/poi-list.state"

import "./index.css"

const store = createStore(
  combineReducers({
    [POIList.name]: POIList.reducer,
    router: routerReducer,
  }),
  applyMiddleware(routerMiddleware(history))
)

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route exact={true} path="/" component={HomePage} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
