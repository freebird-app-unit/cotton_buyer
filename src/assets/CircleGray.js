import * as React from "react"
import Svg, { G, Circle } from "react-native-svg"

function CircleGray(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} {...props}>
      <G data-name="Ellipse 313" fill="#fff" stroke="#d1d1d1">
        <Circle cx={8} cy={8} r={8} stroke="none" />
        <Circle cx={8} cy={8} r={7.5} fill="none" />
      </G>
    </Svg>
  )
}

export default CircleGray
