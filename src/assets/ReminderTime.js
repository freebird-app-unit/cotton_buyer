import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ReminderTime(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      {...props}
    >
      <Path
        data-name="Path 13"
        d="M2.4 2.4A7.263 7.263 0 018 0a7.263 7.263 0 015.6 2.4A7.263 7.263 0 0116 8a7.263 7.263 0 01-2.4 5.6A7.263 7.263 0 018 16a7.263 7.263 0 01-5.6-2.4A7.984 7.984 0 010 8a7.263 7.263 0 012.4-5.6zm9.2 9.2l.933-.933L9.2 7.333 8 2H6.667v6a1.21 1.21 0 00.4.933.466.466 0 00.267.133z"
        fill="#2699fb"
      />
    </Svg>
  )
}

export default ReminderTime
