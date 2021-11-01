import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Chat(props) {
  return (
    <Svg
      data-name="Group 81"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path data-name="Path 180" d="M0 0h24v24H0z" fill="none" />
      <Path
        data-name="Path 181"
        d="M3 20l1.3-3.9A7.417 7.417 0 016.4 5.726a9.856 9.856 0 0111.846.48 7.362 7.362 0 011.029 10.5A9.733 9.733 0 017.7 19L3 20"
        fill="none"
        stroke="#2699fb"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        data-name="Line 1"
        fill="none"
        stroke="#2699fb"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 12v.01"
      />
      <Path
        data-name="Line 2"
        fill="none"
        stroke="#2699fb"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 12v.01"
      />
      <Path
        data-name="Line 3"
        fill="none"
        stroke="#2699fb"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16 12v.01"
      />
    </Svg>
  )
}

export default Chat

