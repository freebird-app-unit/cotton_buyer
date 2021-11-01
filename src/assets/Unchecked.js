import * as React from "react"
import Svg, { G, Rect } from "react-native-svg"

function Unchecked(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <G
        data-name="Rectangle 159"
        fill="#fff"
        stroke="#d1d1d1"
        strokeLinejoin="round"
        strokeWidth={1}
      >
        <Rect width={24} height={24} rx={2} stroke="none" />
        <Rect x={0.5} y={0.5} width={23} height={23} rx={1.5} fill="none" />
      </G>
    </Svg>
  )
}

export default Unchecked

