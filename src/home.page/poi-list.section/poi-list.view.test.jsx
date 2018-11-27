import test from "tape"
import React from "react"
import TestRenderer from "react-test-renderer"

import { POIListView } from "./poi-list.view"

test("POI list view", t => {
  const poiList = TestRenderer.create(
    <POIListView pois={[{ id: "1", name: "lorem" }]} />
  ).toJSON()

  console.log(poiList.children)

  t.deepEquals(
    poiList.children,
    [{ type: "div", props: {}, children: ["lorem"] }],
    "Text is rendered as direct child"
  )

  t.end()
})
