import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function CircleGreen(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} {...props}>
      <Circle data-name="Ellipse 309" cx={8} cy={8} r={8} fill="#69ba53" />
    </Svg>
  )
}

export default CircleGreen
