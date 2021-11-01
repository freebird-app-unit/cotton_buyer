import * as React from "react"
import Svg, { G, Circle } from "react-native-svg"

function FillCircle(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G
        data-name="Ellipse 282"
        fill="#2699fb"
        stroke="#bce0fd"
        strokeWidth={2}
      >
        <Circle cx={12} cy={12} r={12} stroke="none" />
        <Circle cx={12} cy={12} r={11} fill="none" />
      </G>
    </Svg>
  )
}

export default FillCircle
