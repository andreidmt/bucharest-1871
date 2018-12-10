import test from "tape"
import React from "react"
import TestRenderer from "react-test-renderer"

import { UIMarker } from "./marker"

test("UI Marker", t => {
  const marker = TestRenderer.create(
    <UIMarker
      id="ab06db62-6753-4e7f-8af5-16f8d72b37bb"
      label="test"
      left={100}
      top={100}
    />
  ).toJSON()

  t.deepEquals(
    {
      type: marker[0].type,
      label: marker[0].props.title,
      children: marker[0].children,
    },
    {
      type: "div",
      label: "test",
      children: null,
    },
    "Render with default props"
  )
  t.end()
})
