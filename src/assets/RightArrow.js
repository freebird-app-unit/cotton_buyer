import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function RightArrow(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      {...props}
    >
      <G data-name="Group 902" transform="rotate(-90 15 315)">
        <Circle
          data-name="Ellipse 2"
          cx={14}
          cy={14}
          r={14}
          transform="rotate(-90 315 13)"
          fill="none"
        />
        <Path
          d="M322 311.5l-6 6-6-6"
          fill="rgba(0,0,0,0)"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
      </G>
    </Svg>
  )
}

export default RightArrow


