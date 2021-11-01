import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Email(props) {
  return (
    <Svg
      data-name="Group 83"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 16 16"
      {...props}
    >
      <Path data-name="Rectangle 117" fill="none" d="M0 0h16v16H0z" />
      <Path
        data-name="Path 50"
        d="M14 4H2l6 5zM0 4a2.006 2.006 0 012-2h12a2.006 2.006 0 012 2v8a2.006 2.006 0 01-2 2H2a2.006 2.006 0 01-2-2z"
        fill="#2699fb"
        fillRule="evenodd"
      />
    </Svg>
  )
}

export default Email
