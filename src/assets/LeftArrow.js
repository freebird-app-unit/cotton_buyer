import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function LeftArrow(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      {...props}
    >
      <G data-name="Group 5" transform="translate(-5 -55)">
        <Circle
          data-name="Ellipse 2"
          cx={14}
          cy={14}
          r={14}
          transform="translate(5 55)"
          fill="none"
        />
        <Path
          d="M22 75l-6-6 6-6"
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

export default LeftArrow

