import * as React from "react"
import Svg, { G, Path, Circle, Text, TSpan } from "react-native-svg"

function SetPassword(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={82.723}
      height={147.602}
      viewBox="0 0 82.723 147.602"
      {...props}
    >
      <G data-name="Group 925">
        <Path
          d="M461.6 357.65h-63.139a9.788 9.788 0 00-9.791 9.791V495.46a9.788 9.788 0 009.791 9.791H461.6a9.788 9.788 0 009.791-9.791V367.441a9.793 9.793 0 00-9.791-9.791z"
          transform="translate(-3192.04 -175.87) translate(2803.37 -181.78)"
          fill="#506c82"
        />
        <Path
          d="M400.1 489.922V373.99a.172.172 0 01.17-.17h66.183a.173.173 0 01.17.17v115.932a.173.173 0 01-.17.17H400.27a.168.168 0 01-.17-.17z"
          transform="translate(-3192.04 -175.87) translate(2799.94 -186.514)"
          fill="#fffffa"
        />
        <Path
          d="M451.1 549.494a6.934 6.934 0 10-6.934 6.934 6.935 6.935 0 006.934-6.934z"
          transform="translate(-3192.04 -175.87) translate(2789.238 -235.593)"
          fill="#fffffa"
        />
        <Path
          d="M452.378 364.36h-19.61a1.033 1.033 0 00-1.028 1.028v.206a1.029 1.029 0 001.028 1.028h19.61a1.033 1.033 0 001.028-1.028v-.206a1.038 1.038 0 00-1.028-1.028z"
          transform="translate(-3192.04 -175.87) translate(2790.836 -183.733)"
          fill="#fffffa"
        />
        <G
          data-name="Group 924"
          transform="translate(-3192.04 -175.87) translate(3205.482 240.479)"
          fill="#69ba53"
        >
          <Circle
            data-name="Ellipse 240"
            cx={5.317}
            cy={5.317}
            r={5.317}
            transform="translate(44.665)"
          />
          <Circle
            data-name="Ellipse 241"
            cx={5.317}
            cy={5.317}
            r={5.317}
            transform="translate(29.777)"
          />
          <Circle
            data-name="Ellipse 242"
            cx={5.317}
            cy={5.317}
            r={5.317}
            transform="translate(14.888)"
          />
          <Circle data-name="Ellipse 243" cx={5.317} cy={5.317} r={5.317} />
        </G>
        <Text
          transform="translate(-3192.04 -175.87) translate(3213.04 212.321)"
          fill="#69ba53"
          fontSize={8}
          fontFamily="Poppins-SemiBold, Poppins"
          fontWeight={600}
        >
          <TSpan x={0} y={0}>
            {"Password"}
          </TSpan>
        </Text>
      </G>
    </Svg>
  )
}

export default SetPassword
