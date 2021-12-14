import * as React from "react"
import Svg, { G, Path, Circle, Text, TSpan } from "react-native-svg"

function VerifyOtp(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={116}
      height={147.158}
      viewBox="0 0 116 147.158"
      {...props}
    >
      <G data-name="Group 922" transform="translate(-3261.56 -175.87)">
        <Path
          d="M160.063 357.65H97.112a9.759 9.759 0 00-9.762 9.762v127.634a9.759 9.759 0 009.762 9.762h62.951a9.759 9.759 0 009.762-9.762V367.411a9.759 9.759 0 00-9.762-9.761z"
          transform="translate(3174.21 -181.78)"
          fill="#506c82"
        />
        <Path
          d="M98.78 489.573V373.99a.172.172 0 01.17-.17h65.984a.172.172 0 01.17.17v115.583a.172.172 0 01-.17.17H98.95a.167.167 0 01-.17-.17z"
          transform="translate(3170.86 -186.52)"
          fill="#fffffa"
        />
        <Path
          d="M149.736 549.473a6.913 6.913 0 10-6.913 6.913 6.914 6.914 0 006.913-6.913z"
          transform="translate(3159.975 -235.988)"
          fill="#fffffa"
        />
        <Path
          d="M151 364.36h-19.555a1.03 1.03 0 00-1.025 1.025v.205a1.026 1.026 0 001.025 1.025H151a1.03 1.03 0 001.025-1.025v-.205A1.035 1.035 0 00151 364.36z"
          transform="translate(3161.584 -183.747)"
          fill="#fffffa"
        />
        <Path
          d="M171.736 471.02l-7.676 16.7 15.8-11.281z"
          transform="translate(3151.723 -215.015)"
          fill="#69ba53"
        />
        <Circle
          cx={36.212}
          cy={36.212}
          r={36.212}
          transform="translate(3305.137 192.926)"
          fill="#69ba53"
        />
        <G
          data-name="Group 921"
          fill="#fff"
          fontSize={13}
          fontFamily="Poppins-Bold, Poppins"
          fontWeight={700}
        >
          <Text
            data-name={1}
            transform="translate(3315.591 219.786) translate(0 14)"
          >
            <TSpan x={0} y={0}>
              {"1"}
            </TSpan>
          </Text>
          <Text
            data-name={2}
            transform="translate(3315.591 219.786) translate(14.137 14)"
          >
            <TSpan x={0} y={0}>
              {"2"}
            </TSpan>
          </Text>
          <Text
            data-name={3}
            transform="translate(3315.591 219.786) translate(30.394 14)"
          >
            <TSpan x={0} y={0}>
              {"3"}
            </TSpan>
          </Text>
          <Text
            data-name={4}
            transform="translate(3315.591 219.786) translate(47.359 14)"
          >
            <TSpan x={0} y={0}>
              {"4"}
            </TSpan>
          </Text>
        </G>
      </G>
    </Svg>
  )
}

export default VerifyOtp

