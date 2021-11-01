import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Calender(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      {...props}
    >
      <Path data-name="Rectangle 557" fill="none" d="M0 0h16v16H0z" />
      <Path
        data-name="Path 149"
        d="M2 5v9h12V5zm11-3h2a.945.945 0 011 1v12a.945.945 0 01-1 1H1a.945.945 0 01-1-1V3a.945.945 0 011-1h2V1a.945.945 0 011-1 .945.945 0 011 1v1h6V1a1 1 0 012 0zm-1 10h-2v-2h2zm-3 0H7v-2h2zm3-3h-2V7h2zM9 9H7V7h2zm-3 3H4v-2h2z"
        fill="#2699fb"
        fillRule="evenodd"
      />
    </Svg>
  )
}

export default Calender
