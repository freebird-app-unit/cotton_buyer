import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EditMobile(props) {
  return (
    <Svg
      data-name="Group 3"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path data-name="Path 6" d="M0 0h24v24H0z" fill="none" />
      <Path
        data-name="Path 7"
        d="M9 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-3"
        fill="none"
        stroke="#69ba53"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        data-name="Path 8"
        d="M9 15h3l8.5-8.5a2.121 2.121 0 00-3-3L9 12v3"
        fill="none"
        stroke="#69ba53"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        data-name="Line 2"
        transform="translate(16 5)"
        fill="none"
        stroke="#69ba53"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M0 0L3 3"
      />
    </Svg>
  )
}

export default EditMobile




