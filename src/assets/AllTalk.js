import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function AllTalk(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={14.938}
      viewBox="0 0 16 14.938"
      {...props}
    >
      <G fill="#2699fb">
        <Path
          data-name="Path 201"
          d="M9.932 2.922A5.235 5.235 0 000 5.216a5.16 5.16 0 00.5 2.229L.01 9.897a.447.447 0 00.525.526l2.482-.491a5.143 5.143 0 001.035.362 6.117 6.117 0 015.88-7.372z"
        />
        <Path
          data-name="Path 202"
          d="M15.501 11.951a5.2 5.2 0 00.224-.552h-.016a5.222 5.222 0 00-4.7-6.887 5.216 5.216 0 10-.251 10.426 5.159 5.159 0 002.223-.5c2.719.537 2.507.5 2.569.5a.447.447 0 00.438-.535z"
        />
      </G>
    </Svg>
  )
}

export default AllTalk
