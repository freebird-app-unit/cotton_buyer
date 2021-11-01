import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EmployeeGray(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      viewBox="0 0 25 25"
      {...props}
    >
      <Path
        data-name="Union 2"
        d="M0 25v-3.125c0-3.438 5.625-6.251 12.5-6.251S25 18.437 25 21.875V25zM6.249 6.25A6.25 6.25 0 1112.5 12.5a6.251 6.251 0 01-6.251-6.25z"
        fill="#999"
      />
    </Svg>
  )
}

export default EmployeeGray
