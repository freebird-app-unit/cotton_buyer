import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BackArrow(props) {
  return (
    <Svg
      data-name="Backward arrow"
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      {...props}
    >
      <Path
        data-name="Path 10"
        d="M8 16l1.455-1.455-5.506-5.506H16V6.961H3.948l5.507-5.506L8 0 0 8z"
        fill="#2699fb"
      />
    </Svg>
  )
}

export default BackArrow
