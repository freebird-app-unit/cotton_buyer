import * as React from "react"
import Svg, { Path, Ellipse } from "react-native-svg"

function Profile_Icon(props) {
  return (
    <Svg
      data-name="Group 813"
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      {...props}
    >
      <Path data-name="Path 210" d="M0 0h28v28H0z" fill="none" />
      <Ellipse
        data-name="Ellipse 238"
        cx={5}
        cy={4.5}
        rx={5}
        ry={4.5}
        transform="translate(9 4)"
        fill="none"
        stroke="#2c3e50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Path
        data-name="Path 211"
        d="M7 24.5v-2.333a4.667 4.667 0 014.667-4.667h4.667A4.667 4.667 0 0121 22.167V24.5"
        fill="none"
        stroke="#2c3e50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  )
}

export default Profile_Icon
