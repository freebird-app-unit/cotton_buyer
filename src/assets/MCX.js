import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"

function MCX_Icon(props) {
  return (
    <Svg
      data-name="Group 70"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path data-name="Path 130" d="M0 0h24v24H0z" fill="none" />
      <Rect
        data-name="Rectangle 152"
        width={18}
        height={12}
        rx={1}
        transform="translate(3 4)"
        fill="none"
        stroke="#2c3e50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Path
        data-name="Line 26"
        transform="translate(7 20)"
        fill="none"
        stroke="#2c3e50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M0 0L10 0"
      />
      <Path
        data-name="Line 27"
        transform="translate(9 16)"
        fill="none"
        stroke="#2c3e50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M0 0L0 4"
      />
      <Path
        data-name="Line 28"
        transform="translate(15 16)"
        fill="none"
        stroke="#2c3e50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M0 0L0 4"
      />
      <Path
        data-name="Path 131"
        d="M8 12l3-3 2 2 3-3"
        fill="none"
        stroke="#69ba53"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  )
}

export default MCX_Icon
