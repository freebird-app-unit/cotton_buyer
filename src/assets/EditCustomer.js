import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function EditCustomer(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      viewBox="0 0 40 40"
      {...props}
    >
      <G transform="translate(-295 -228)">
        <Circle
          data-name="Ellipse 113"
          cx={20}
          cy={20}
          r={20}
          transform="translate(295 228)"
          fill="#fff"
        />
        <Path data-name="Rectangle 324" fill="none" d="M307 240h16v16h-16z" />
        <Path
          data-name="Path 110"
          d="M315.154 243.077l-5.692 5.846L307 256l7.077-2.308 5.692-5.692zm7.231-.462l-2-2a1.865 1.865 0 00-2.769 0l-1.693 1.693 4.615 4.769 1.846-1.846a1.95 1.95 0 00.616-1.385 1.9 1.9 0 00-.615-1.231z"
          fill="#2699fb"
        />
      </G>
    </Svg>
  )
}

export default EditCustomer
