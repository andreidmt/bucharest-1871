import test from "tape"
import React from "react"
import TestRenderer from "react-test-renderer"

import { Marker } from "./marker"

test("UI Marker", t => {
  const marker = TestRenderer.create(
    <Marker label="test" left={100} top={100} />
  ).toJSON()

  t.deepEquals(
    {
      type: marker.type,
      title: marker.props.title,
      children: [
        {
          type: marker.children[0].type,
        },
      ],
    },
    {
      type: "div",
      title: "test",
      children: [
        {
          type: "i",
        },
      ],
    },
    "Render with default props"
  )

  t.end()
})
