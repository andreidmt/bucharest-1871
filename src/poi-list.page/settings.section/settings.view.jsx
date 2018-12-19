// @flow

const debug = require("debug")("Bucharest1871:SettingsView")

import * as React from "react"
import { map } from "@asd14/m"

import { UIInput } from "../../ui/input/input"
import type { LayoutSettingsType } from "../../layout/layout.state"

type PropsType = {|
  settings: LayoutSettingsType[],
  onChange: Function,
|}

export const SettingsView = React.memo<PropsType>(
  ({ settings, onChange }): React.Node => (
    <div>
      <h1>Settings</h1>
      {map(
        ({ id, value, name }: LayoutSettingsType): React.Node => (
          <UIInput
            key={`settings-${id}`}
            type="checkbox"
            value={name}
            label={name}
            isChecked={value === true}
            onChange={onChange(id)}
          />
        )
      )(settings)}
    </div>
  )
)
