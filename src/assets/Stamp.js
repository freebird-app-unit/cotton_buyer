import * as React from "react"
import Svg, { G, Rect, Path, Text, TSpan } from "react-native-svg"

function Stamp_Icon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={100}
      height={100}
      viewBox="0 0 100 100"
      {...props}
    >
      <G data-name="Group 978">
        <G
          data-name="Rectangle 133"
          transform="translate(-17 -804) translate(17 804)"
          fill="#fff"
          stroke="#69ba53"
          strokeWidth={1}
        >
          <Rect width={100} height={100} rx={5} stroke="none" />
          <Rect x={0.5} y={0.5} width={99} height={99} rx={4.5} fill="none" />
        </G>
        <G
          data-name="Group 977"
          transform="translate(-17 -804) translate(56.687 831.608)"
          fill="none"
        >
          <Path data-name="Path 213" d="M0 0h20.706v20.706H0z" />
          <Path
            data-name="Path 214"
            d="M3.451 14.667v1.726a1.726 1.726 0 001.726 1.726H15.53a1.726 1.726 0 001.721-1.726v-1.726"
            stroke="#69ba53"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
          <Path
            data-name="Path 215"
            d="M6.039 7.765l4.314-4.314 4.314 4.314"
            stroke="#69ba53"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
          <Path
            data-name="Line 117"
            transform="translate(10.313 3.392)"
            stroke="#69ba53"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M0 0L0 10"
          />
        </G>
        <Text
          data-name="Upload Stamp"
          transform="translate(-17 -804) translate(46 863)"
          fill="#69ba53"
          fontSize={6}
          fontFamily="Poppins-Regular, Poppins"
        >
          <TSpan x={0} y={0}>
            {"Upload Stamp"}
          </TSpan>
        </Text>
      </G>
    </Svg>
  )
}

export default Stamp_Icon
