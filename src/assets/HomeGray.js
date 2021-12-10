import * as React from "react"
import Svg, { Path } from "react-native-svg"

function HomeGray(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      viewBox="0 0 25.814 24.991"
      {...props}
    >
      <Path
        data-name="Path 150"
        d="M25.49 12.193a1.231 1.231 0 00-.1-1.761L13.853.337a1.438 1.438 0 00-1.876.022L.4 10.97a1.224 1.224 0 00-.056 1.759l.29.3a1.266 1.266 0 001.737.133l.865-.775v11.345A1.259 1.259 0 004.5 24.991h4.51a1.259 1.259 0 001.259-1.259v-7.935h5.755v7.935a1.19 1.19 0 001.183 1.259h4.782a1.259 1.259 0 001.259-1.259V12.549l.534.468c.294.259.912.051 1.38-.464z"
        fill="#999"
      />
    </Svg>
  )
}

export default HomeGray
