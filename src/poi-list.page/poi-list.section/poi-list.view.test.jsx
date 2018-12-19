import test from "tape"
import React from "react"
import TestRenderer from "react-test-renderer"
import { MemoryRouter } from "react-router"
import { Link } from "react-router-dom"

import { POIListView } from "./poi-list.view"

test("POI list view", t => {
  const testRenderer = TestRenderer.create(
    <MemoryRouter>
      <POIListView
        pois={[{ id: "1", name: "lorem" }, { id: "2", name: "lorem" }]}
      />
    </MemoryRouter>
  )
  const testInstance = testRenderer.root

  t.equals(
    testInstance.findAllByType(Link).length,
    2,
    "Render one link for each poi"
  )

  t.end()
})
