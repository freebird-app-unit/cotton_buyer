import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function Brokers_Icon(props) {
  return (
    <Svg
      data-name="Group 1047"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path data-name="Path 280" d="M0 0h24v24H0z" fill="none" />
      <Circle
        data-name="Ellipse 343"
        cx={4}
        cy={4}
        r={4}
        transform="translate(5 3)"
        fill="none"
        stroke="#2c3e50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        data-name="Path 281"
        d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"
        fill="none"
        stroke="#2c3e50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        data-name="Path 282"
        d="M16 3.13a4 4 0 010 7.75"
        fill="none"
        stroke="#69ba53"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        data-name="Path 283"
        d="M21 21v-2a4 4 0 00-3-3.85"
        fill="none"
        stroke="#69ba53"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </Svg>
  )
}

export default Brokers_Icon
