import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Download(props) {
  return (
    <Svg
      data-name="Group 872"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path data-name="Path 161" d="M0 0h24v24H0z" fill="none" />
      <Path
        data-name="Path 162"
        d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
        fill="none"
        stroke="#69ba53"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        data-name="Path 163"
        d="M7 11l5 5 5-5"
        fill="none"
        stroke="#69ba53"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        data-name="Line 87"
        transform="translate(12 4)"
        fill="none"
        stroke="#69ba53"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M0 0L0 12"
      />
    </Svg>
  )
}

export default Download

