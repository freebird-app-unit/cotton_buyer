import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Place(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      {...props}
    >
      <Path data-name="Rectangle 305" fill="none" d="M0 0h16v16H0z" />
      <Path
        data-name="Path 114"
        d="M7.555 9.52a2.786 2.786 0 002.791-2.791 2.872 2.872 0 00-2.791-2.891 2.786 2.786 0 00-2.792 2.791A2.942 2.942 0 007.555 9.52zM2.869 1.944a6.626 6.626 0 019.371 9.371L7.555 16l-4.686-4.685a6.807 6.807 0 010-9.371z"
        fill="#2699fb"
        fillRule="evenodd"
      />
    </Svg>
  )
}

export default Place
