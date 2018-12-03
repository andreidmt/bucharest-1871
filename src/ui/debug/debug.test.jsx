import test from "tape"
import React from "react"
import TestRenderer from "react-test-renderer"

import { Debug } from "./debug"

test("UI Debug", t => {
  const debug = TestRenderer.create(
    <Debug
      dump={{
        lorem: "ipsum",
      }}
    />
  ).toJSON()

  t.deepEquals(
    {
      type: debug.type,
      children: [
        {
          type: debug.children[0].type,
        },
      ],
    },
    {
      type: "div",
      children: [
        {
          type: "div",
        },
      ],
    },
    "Render with default props"
  )

  t.end()
})
