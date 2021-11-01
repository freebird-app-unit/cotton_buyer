import * as React from "react"
import Svg, { G, Rect, Path } from "react-native-svg"

function ParticipantCall(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={36}
      height={36}
      viewBox="0 0 36 36"
      {...props}
    >
      <G data-name="Group 927" transform="translate(-322 -193)">
        <Rect
          data-name="Rectangle 192"
          width={36}
          height={36}
          rx={5}
          transform="translate(322 193)"
          fill="#69ba53"
        />
        <G data-name="Group 913" fill="none">
          <Path
            data-name="Path 167"
            d="M0 0h24v24H0z"
            transform="translate(328 199)"
          />
          <Path
            data-name="Path 168"
            d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            transform="translate(328 199)"
          />
        </G>
      </G>
    </Svg>
  )
}

export default ParticipantCall
