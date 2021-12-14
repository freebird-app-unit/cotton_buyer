import * as React from "react"
import Svg, { G, Rect, Path } from "react-native-svg"

function Checked(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G
        data-name="Group 233"
        transform="translate(-24 -371) translate(24 371)"
      >
        <Rect
          data-name="Rectangle 158"
          width={24}
          height={24}
          rx={2}
          fill="#69ba53"
        />
        <G data-name="Group 84" fill="none">
          <Path data-name="Path 146" d="M0 0h24v24H0z" />
          <Path
            data-name="Path 147"
            d="M5 12l5 5L20 7"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
        </G>
      </G>
    </Svg>
  )
}

export default Checked




