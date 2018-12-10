import test from "tape"
import React from "react"

import reactDom from "react-dom/server"
import dom from "cheerio"
import ReactTestUtils from "react-dom/test-utils"

const render = reactDom.renderToStaticMarkup

import { Marker } from "./marker"

test("UI Marker", t => {
  const $ = dom.load(render(<Marker label="test" left={100} top={100} />))

  console.log($("div").getDOMNode())

  t.equals(
    $("div").attr("title"),
    "test",
    "Wrapper rendered with title attribute"
  )
  t.equals(marker.children[0].type, "i", "Icon rendered")

  t.end()
})
