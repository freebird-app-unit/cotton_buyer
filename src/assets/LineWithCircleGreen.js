import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function LineWithCircleGreen(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={99} height={16} {...props}>
      <G data-name="Group 936" transform="translate(-2647 188)" fill="#69ba53">
        <Circle
          data-name="Ellipse 3121"
          cx={8}
          cy={8}
          r={8}
          transform="translate(2730 -188)"
        />
        <Path data-name="Rectangle 13751" d="M2647-181h91v2h-91z" />
      </G>
    </Svg>
  )
}

export default LineWithCircleGreen
