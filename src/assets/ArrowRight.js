import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowRight(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      {...props}
    >
      <Path
        data-name="Path 208"
        d="M8 0L6.545 1.455l5.506 5.506H0v2.078h12.052l-5.507 5.506L8 16l8-8z"
        fill="#2699fb"
      />
    </Svg>
  )
}

export default ArrowRight
