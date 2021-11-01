import * as React from "react"
import Svg, { G, Path, Circle } from "react-native-svg"

function Search(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G data-name="Group 797" opacity={0.5} fill="none">
        <Path data-name="Path 148" d="M0 0h24v24H0z" />
        <Circle
          data-name="Ellipse 234"
          cx={7}
          cy={7}
          r={7}
          transform="translate(3 3)"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
        <Path
          data-name="Line 36"
          transform="translate(15 15)"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M6 6L0 0"
        />
      </G>
    </Svg>
  )
}

export default Search
