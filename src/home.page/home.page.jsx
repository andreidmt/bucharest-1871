const debug = require("debug")("Bucharest1871:HomePage")

import React from "react"
import { POIListContainer } from "./poi-list.section/poi-list.container"

class HomePage extends React.Component {
  render = () => <POIListContainer text="asd2" />
}

export { HomePage }
