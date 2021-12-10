import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function MinusRound(props) {
  return (
    <Svg
      data-name="Group 36"
      xmlns="http://www.w3.org/2000/svg"
      width={48.617}
      height={48.617}
      viewBox="0 0 48.617 48.617"
      {...props}
    >
      <Path data-name="Path 104" d="M0 0h48.617v48.617H0z" fill="none" />
      <Circle
        data-name="Ellipse 228"
        cx={17.719}
        cy={17.719}
        r={17.719}
        transform="translate(6.589 6.589)"
        fill="none"
        stroke="#d1d1d1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Path
        data-name="Line 3"
        transform="translate(17.865 24.308)"
        fill="none"
        stroke="#343434"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M0 0L12.887 0"
      />
    </Svg>
  )
}

export default MinusRound



