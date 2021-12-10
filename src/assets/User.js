import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function User(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={45}
      height={45}
      viewBox="0 0 60 60"
      {...props}
    >
      <G data-name="Group 85" transform="translate(-40 -164)">
        <Circle
          data-name="Ellipse 234"
          cx={30}
          cy={30}
          r={30}
          transform="translate(40 164)"
          fill="#2699fb"
        />
        <Circle
          data-name="Ellipse 235"
          cx={6}
          cy={6}
          r={6}
          transform="translate(64 182)"
          fill="#fff"
        />
        <Path
          data-name="Path 200"
          d="M70 197c-6.6 0-12 2.7-12 6v3h24v-3c0-3.3-5.4-6-12-6z"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}

export default User
