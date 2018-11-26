import test from "tape"
import React from "react"
import TestRenderer from "react-test-renderer"

import { POIListView } from "./poi-list.view"

test("Todos list view", t => {
  const todoList = TestRenderer.create(<POIListView text="foo" />).toJSON()

  t.deepEquals(todoList.children, ["foo"], "Text is rendered as direct child")

  t.end()
})
