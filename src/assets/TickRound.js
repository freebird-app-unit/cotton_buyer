import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function TickRound(props) {
  return (
    <Svg
      data-name="Component 4 \u2013 1"
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path data-name="Path 146" d="M0 0h24v24H0z" fill="none" />
      <Circle
        data-name="Ellipse 233"
        cx={9}
        cy={9}
        r={9}
        transform="translate(3 3)"
        fill="#69ba53"
      />
      <Path
        data-name="Path 147"
        d="M9 12l2 2 4-4"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </Svg>
  )
}

export default TickRound


