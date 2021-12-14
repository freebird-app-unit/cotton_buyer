import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function Done_Icon(props) {
  return (
    <Svg
      data-name="Group 1109"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path data-name="Path 306" d="M0 0h24v24H0z" fill="none" />
      <Circle
        data-name="Ellipse 350"
        cx={9}
        cy={9}
        r={9}
        transform="translate(3 3)"
        fill="none"
        stroke="#2c3e50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        data-name="Path 307"
        d="M9 12l2 2 4-4"
        fill="none"
        stroke="#2c3e50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </Svg>
  )
}

export default Done_Icon
