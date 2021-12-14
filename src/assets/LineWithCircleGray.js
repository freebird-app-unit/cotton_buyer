import * as React from "react"
import Svg, { G, Path, Circle } from "react-native-svg"

function LineWithCircleGray(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={102}  height={16} {...props}>
      <G data-name="Group 937">
        <Path data-name="Rectangle 1376" fill="#d1d1d1" d="M0 7h94v2H0z" />
        <G
          data-name="Ellipse 315"
          transform="translate(86)"
          fill="#fff"
          stroke="#d1d1d1"
        >
          <Circle cx={8} cy={8} r={8} stroke="none" />
          <Circle cx={8} cy={8} r={7.5} fill="none" />
        </G>
      </G>
    </Svg>
  )
}

export default LineWithCircleGray
