import test from "tape"
import React from "react"
import TestRenderer from "react-test-renderer"

import { MemoryRouter } from "react-router"
import { UISidemenu } from "./sidemenu"

test("UI Sidemenu", t => {
  const emptySidemenu = TestRenderer.create(<UISidemenu items={[]} />).toJSON()

  t.deepEquals(
    { type: emptySidemenu.type, children: emptySidemenu.children },
    { type: "div", children: null },
    "Render with default props"
  )

  /*
   * Need to use a dummy MemoryRouter since Sidemenu creates NavLink components
   * that use router info to know when is active
   */
  const sidemenu = TestRenderer.create(
    <MemoryRouter>
      <UISidemenu
        items={[
          { label: "Lorem Home", icon: "globe", url: "/" },
          { label: "Lorem", icon: "globe", url: "/lorem" },
        ]}
      />
    </MemoryRouter>
  ).toJSON()

  t.deepEquals(
    {
      type: sidemenu.type,
      children: [
        {
          type: sidemenu.children[0].type,
          className: sidemenu.children[0].props.className,
          title: sidemenu.children[0].props.title,
        },
        {
          type: sidemenu.children[1].type,
          className: sidemenu.children[1].props.className,
          title: sidemenu.children[1].props.title,
        },
      ],
    },
    {
      type: "div",
      children: [
        {
          type: "a",
          className: "active",
          title: "Lorem Home",
        },
        {
          type: "a",
          className: "",
          title: "Lorem",
        },
      ],
    },
    "Render with multiple links, one active"
  )
  t.end()
})
