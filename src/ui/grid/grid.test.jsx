import test from "tape"
import React from "react"
import TestRenderer from "react-test-renderer"
import { MemoryRouter } from "react-router"

import { UIGrid } from "./grid"
import { UIMarker } from "../marker/marker"

test("UI Grid", t => {
  const testRenderer = TestRenderer.create(
    <MemoryRouter>
      <UIGrid
        markers={[
          {
            id: "1",
            label: "test",
            left: 100,
            top: 100,
          },
        ]}
        mapURL=""
        width={100}
        height={100}
      />
    </MemoryRouter>
  )
  const testInstance = testRenderer.root

  t.equals(
    testInstance.findAllByType(UIMarker).length,
    1,
    "Render one UIMarker for each POI"
  )

  t.end()
})
