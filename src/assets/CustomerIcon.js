import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function CustomerIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28.641}
      height={24.991}
      viewBox="0 0 28.641 24.991"
      {...props}
    >
      <G transform="translate(0 -32.631)">
        <Circle
          data-name="Ellipse 285"
          cx={4.867}
          cy={4.867}
          r={4.867}
          transform="translate(9.454 32.631)"
          fill="#999"
        />
        <Circle
          data-name="Ellipse 286"
          cx={3.077}
          cy={3.077}
          r={3.077}
          transform="translate(21.089 36.211)"
          fill="#999"
        />
        <Circle
          data-name="Ellipse 287"
          cx={3.077}
          cy={3.077}
          r={3.077}
          transform="translate(1.399 36.211)"
          fill="#999"
        />
        <Path
          data-name="Path 155"
          d="M7.507 45.128C6.3 44.133 5.2 44.267 3.8 44.267A3.791 3.791 0 000 48.042v6.109a1.644 1.644 0 001.645 1.639c3.917 0 3.445.071 3.445-.169.001-4.328-.512-7.503 2.417-10.493z"
        fill="#999"
        />
        <Path
          data-name="Path 156"
          d="M15.653 44.289c-2.446-.2-4.572 0-6.406 1.516-3.069 2.458-2.478 5.768-2.478 9.816a1.962 1.962 0 001.959 1.959c11.808 0 12.278.381 12.978-1.17.23-.524.167-.358.167-5.374a6.782 6.782 0 00-6.22-6.747z"
        fill="#999"
        />
        <Path
          data-name="Path 157"
          d="M24.843 44.266c-1.408 0-2.5-.13-3.708.861 2.907 2.968 2.416 5.926 2.416 10.494 0 .241-.392.169 3.387.169a1.7 1.7 0 001.7-1.7v-6.051a3.791 3.791 0 00-3.795-3.773z"
        fill="#999"
        />
      </G>
    </Svg>
  )
}

export default CustomerIcon

