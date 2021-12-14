import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function Businessman(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      {...props}
    >
      <G data-name="Group 37">
        <G data-name="Group 36" fill="#2699fb">
          <Circle
            data-name="Ellipse 290"
            cx={4.364}
            cy={4.364}
            r={4.364}
            transform="translate(3.636)"
          />
          <Path
            data-name="Path 179"
            d="M14.21 11.095a16.1 16.1 0 00-3.092-1.2.362.362 0 00-.437.228l-1.49 4.158-.452-2.259.7-2.09a.364.364 0 00-.345-.479H6.909a.364.364 0 00-.345.479l.7 2.09-.451 2.257-1.494-4.157a.363.363 0 00-.437-.228 16.1 16.1 0 00-3.092 1.2A3.272 3.272 0 000 14.014v.532a1.456 1.456 0 001.455 1.455h13.09A1.456 1.456 0 0016 14.546v-.532a3.272 3.272 0 00-1.79-2.919z"
          />
        </G>
      </G>
    </Svg>
  )
}

export default Businessman
