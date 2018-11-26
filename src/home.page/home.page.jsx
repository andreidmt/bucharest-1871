const debug = require("debug")("Bucharest1871:HomePage")

import React from "react"
import { POIList } from "./poi-list.section/poi-list.container"

class HomePage extends React.Component {
  render = () => <POIList text="asd2" />
}

export { HomePage }
