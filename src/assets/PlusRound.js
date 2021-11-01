import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function PlusRound(props) {
  return (
    <Svg
      data-name="Group 35"
      xmlns="http://www.w3.org/2000/svg"
      width={48.62}
      height={48.62}
      viewBox="0 0 48.62 48.62"
      {...props}
    >
      <Path data-name="Path 103" d="M0 0h48.62v48.62H0z" fill="none" />
      <Circle
        data-name="Ellipse 227"
        cx={17.682}
        cy={17.682}
        r={17.682}
        transform="translate(6.628 6.628)"
        fill="#69ba53"
      />
      <Path
        data-name="Line 1"
        transform="translate(17.682 24.31)"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M0 0L13.255 0"
      />
      <Path
        data-name="Line 2"
        transform="translate(24.31 17.682)"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M0 0L0 13.255"
      />
    </Svg>
  )
}

export default PlusRound



