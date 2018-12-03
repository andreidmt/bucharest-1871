import test from "tape"
import React from "react"
import TestRenderer from "react-test-renderer"

import { Grid } from "./grid"

test("UI Grid", t => {
  const emptyGrid = TestRenderer.create(
    <Grid markers={[]} mapURL="" width={100} height={100} />
  ).toJSON()

  t.deepEquals(
    {
      type: emptyGrid.type,
      children: [
        {
          type: emptyGrid.children[0].type,
          children: emptyGrid.children[0].children,
        },
      ],
    },
    {
      type: "div",
      children: [
        {
          type: "div",
          children: null,
        },
      ],
    },
    "Render with default props"
  )

  t.end()
})